#! /usr/bin/env julia
function strDiff(one, other)
  sum(collect(one) .!== collect(other))
end

function getSingleDiff(lines)
  for (one, other) in Iterators.product(lines, lines)
    one = collect(one)
    other = collect(other)
    if strDiff(one, other) == 1
      return (one, other)
    end
  end
end

(one, other) = getSingleDiff(readlines())
println(one)
println(other)
println(join(one[one .== other]))
