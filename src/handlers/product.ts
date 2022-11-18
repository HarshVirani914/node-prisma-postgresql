import prisma from "../db";

// Get all products
export const getProducts = async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true,
        },
    });

    res.json({
        data: user.products
    })
}

// Get a single product
export const getProduct = async (req: any, res: any, next: (arg0: any) => void) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: req.params.id,
                belongsToId: req.user.id,
            },
        });

        res.json({
            data: product
        })
    }
    catch (err) {
        next(err);
    }
}

// Create a product
export const createProduct = async (req: any, res: any) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id,
        },
    });

    res.json({
        data: product
    })
}

// Update a product
export const updateProduct = async (req: any, res: any) => {
    const product = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            }
        },
        data: {
            name: req.body.name,
        },
    });

    res.json({
        data: product
    })
}

// Delete a product
export const deleteProduct = async (req: any, res: any) => {
    const product = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id,
            },
        },
    });

    res.json({
        data: product
    })
}

