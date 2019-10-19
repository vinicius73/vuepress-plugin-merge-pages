const applyFilter = (pages, filter) => {
  return filter
    ? filter(pages)
    : pages
}

module.exports = applyFilter
