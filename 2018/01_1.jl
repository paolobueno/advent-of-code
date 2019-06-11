#! /usr/bin/env julia
println(sum(x -> parse(Int, x), readlines()))