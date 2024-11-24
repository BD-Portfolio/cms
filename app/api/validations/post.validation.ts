export const validatePost = (data: any) => {
    if (!data.title) {
        return {
            error: true,
            msg: "Title is mandatory"
        }
    }

    if (data.title.length < 3) {
        return {
            error: true,
            msg: "Title length must be greater than 2"
        }
    }

    if (!data.content) {
        return {
            error: true,
            msg: "Content is mandatory"
        }
    }

    if (data.content.length < 3) {
        return {
            error: true,
            msg: "Content length must be greater than 2"
        }
    }

    return {
        error: false,
        msg: "success"
    }
}