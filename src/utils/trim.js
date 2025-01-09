const trim = (content, value) => {
    if (value === null) return content
    return (
        content?.length < parseInt(value) ? content : `${(content)?.slice(0, parseInt(value))}...`
    )
}

export default trim