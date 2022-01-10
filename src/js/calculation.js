let utils = "\
function magnitude(vec)\
{\
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);\
}\
function normalize(vec)\
{\
    var l = magnitude(vec);\
    return [vec[0] / l, vec[1] / l, vec[2] / l];\
}\
function add(vec1, vec2)\
{\
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];\
}\
";