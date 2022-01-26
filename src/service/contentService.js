const API_ENDPOINT = '' // Set your API endpoint URL here

const getPresignedUploadParams = async (name) => {
    try {
        const url = `${API_ENDPOINT}/api/v1/files`
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        })   
    } catch (error) {
        console.error(error)
    }
}

export default getPresignedUploadParams
    