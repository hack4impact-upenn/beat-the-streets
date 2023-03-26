function toObject<K, V> (map: Map<K, V>) : object {
  return Object.fromEntries
    ( Array.from
        ( map.entries()
        , ([ k, v ]) =>
            v instanceof Map
              ? [ k, toObject(v) ]
              : [ k, v ]
        )
    )
}
export default toObject;