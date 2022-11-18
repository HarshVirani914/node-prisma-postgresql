import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { handleInputError } from './modules/middleware';
import { Router } from 'express';
import { body } from 'express-validator';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Product
*/

router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', body("name").isString(), handleInputError, createProduct)
router.put('/product/:id', body("name").isString(), handleInputError, updateProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Update
*/

router.get('/update', getUpdates)
router.get('/update/:id', getUpdate)
router.post('/update',
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputError,
    createUpdate
)
router.put('/update/:id',
    body("title").optional(),
    body("body").optional(),
    body("status").optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body("version").optional(),
    handleInputError,
    updateUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.post('/updatepoint',
    body("name").exists().isString(),
    body("discription").exists().isString(),
    body("updateId").exists().isString(),
    () => { }
)
router.put('/updatepoint/:id',
    body("name").optional().isString(),
    body("discription").optional().isString(),
    () => { }
)
router.delete('/updatepoint/:id', () => { })

export default router;
