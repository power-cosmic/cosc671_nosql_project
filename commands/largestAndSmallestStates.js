db.zips.aggregate([
  { $group: {
    _id: '$state',
    total: { $sum: '$pop' }
  }},
  { $group: {
    _id: null,
    largest: { $max: '$total'},
    smallest: {$min: '$total'}
  }}
])
