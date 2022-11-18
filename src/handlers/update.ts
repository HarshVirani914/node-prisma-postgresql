import prisma from "../db";

// get all updates
export const getUpdates = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({
        data: updates,
    })
}

// get a single update
export const getUpdate = async (req: any, res: any) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id,
        },
    });

    res.json({
        data: update
    })
}

// create an update
export const createUpdate = async (req: any, res: any) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
        },
    });

    if (!product) {
        res.status(400).json({
            message: "Product not found"
        })
        return;
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: { id: req.body.productId }
            },
        }
    });

    res.json({
        data: update
    })
}

// update an update
export const updateUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });

    const updates = products.map(product => product.updates).flat();

    const update = updates.find(update => update.id === req.params.id);

    if (!update) {
        res.status(400).json({
            message: "Update not found"
        })
        return;
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body
    });

    res.json({
        data: updatedUpdate
    })
}

// delete an update
export const deleteUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });

    const updates = products.map(product => product.updates).flat();

    const update = updates.find(update => update.id === req.params.id);

    if (!update) {
        res.status(400).json({
            message: "Update not found"
        })
        return;
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    });

    res.json({
        data: deletedUpdate
    })
}
