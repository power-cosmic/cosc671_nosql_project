db.zips.mapReduce(
  function() {
    emit( this.state, this.pop );
  },
  function(key, populations) {
    return Array.sum(populations);
  },
  {
    query: {},
    out: 'populations'
  }
)
