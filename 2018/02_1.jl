#! /usr/bin/env julia
function incDict!(dict, key)
  value = get!(dict, key, 0) + 1
  setindex!(dict, value, key)
  return dict
end

charCounts = str -> foldl(incDict!, str; init=Dict())

counts = map(charCounts, readlines())
twos = sum(count -> 2 in values(count) ? 1 : 0, counts)
threes = sum(count -> 3 in values(count) ? 1 : 0, counts)
println(twos * threes)
