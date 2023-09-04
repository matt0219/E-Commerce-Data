const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, through: ProductTag }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body, {
      include: [{ model: Tag, through: ProductTag }],
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// update product
router.put('/:id', async (req, res) => {
  try {
    const [rowsAffected] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      include: [{ model: Tag, through: ProductTag }],
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Handle tags update if req.body.tagIds exists
    if (req.body.tagIds) {
      const product = await Product.findByPk(req.params.id);
      await product.setTags(req.body.tagIds);
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
