// Oren–Nayar Diffuse Reflection
const oren_nayar = "\
if (theta_o > Math.PI / 2) return 0;\
\
sigma = sigma * Math.PI / 180;\
var sqr_sigma = sigma * sigma;\
var A = 1 - sqr_sigma / (2 * sqr_sigma + 0.33);\
var B = 0.45 * sqr_sigma / (sqr_sigma + 0.09);\
var alpha = Math.max(theta_o, theta_i);\
var beta = Math.min(theta_o, theta_i);\
\
return (A + B * Math.max(0, Math.cos(phi_i - phi_o)) * Math.sin(alpha) * Math.tan(beta)) / Math.PI;\
";

// Lambertian
const lambert = "return theta_o < Math.PI / 2 ? 1 / Math.PI : 0;";