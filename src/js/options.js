let eval_fmt_base = "1";

function calc_x(u, v) {
    return eval(utils.format("function") + eval_fmt_base.format(u, v)) * Math.sin(v) * Math.sin(u);
}

function calc_y(u, v) {
    return eval(utils.format("function") + eval_fmt_base.format(u, v)) * Math.sin(v) * Math.cos(u);
}

function calc_z(u, v) {
    return eval(utils.format("function") + eval_fmt_base.format(u, v)) * Math.cos(v);
}

let base_opt_2d = {}

let base_opt_3d = {
    tooltip: {},
    visualMap: {
        show: false,
        dimension: 2,
        min: -1,
        max: 1,
        inRange: {
            color: [
                '#fff'
            ]
        }
    },
    xAxis3D: {
        min: -2,
        max: 2
    },
    yAxis3D: {
        min: -2,
        max: 2
    },
    zAxis3D: {
        min: -2,
        max: 2
    },
    grid3D: {},
    series: [
        {
            type: 'surface',
            parametric: true,
            shading: 'color',
            wireframe: {
                show: false
            },
            colorMaterial: {
                detailTexture: "/assets/red-color.png",
                textureTiling: 1
            },
            parametricEquation: {
                u: {
                    min: -Math.PI,
                    max: Math.PI,
                    step: Math.PI / 30
                },
                v: {
                    min: 0,
                    max: Math.PI,
                    step: Math.PI / 30
                },
                x: calc_x,
                y: calc_y,
                z: calc_z
            }
        },
        {
            type: 'surface',
            wireframe: {
                show: false
            },
            shading: 'lambert',
            equation: {
                x: {
                    step: 4,
                    min: -2,
                    max: 2
                },
                y: {
                    step: 4,
                    min: -2,
                    max: 2
                },
                z: function (x, y) {
                    return 0;
                }
            },
            lambertMaterial: {
                detailTexture: "/assets/blue-color.png",
                textureTiling: 1
            },
            silent: true
        },
        {
            type: 'line3D',
            data: [
                {
                    name: "wi start",
                    value: [-2, 0, 2],
                    lineStyle: {
                        color: [0.4, 0.4, 0.8, 1.0],
                        opacity: 1
                    }
                },
                {
                    name: "wi end",
                    value: [0, 0, 0],
                    lineStyle: {
                        color: [0.4, 0.4, 0.8, 1.0],
                        opacity: 1
                    }
                },
            ],
            lineStyle: {
                width: 4
            }
        }
    ]
};