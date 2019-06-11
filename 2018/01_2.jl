#! /usr/bin/env julia
lines = map(x -> parse(Int, x), readlines())

i = 1
value = 0;
visited = BitSet()
while !(value in visited)
  push!(visited, value)
  value += lines[i]
  if i >= length(lines)
    i = 0
  end
  i += 1
end
println(value)
