const getColumns = async () => {
    // @ts-ignore
    const table = await storeApi?.getTableInfo()
    return table ?? []
}
