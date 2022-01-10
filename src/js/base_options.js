let eval_fmt_base = "1";

function calc_x(u, v) {
    return eval(eval_fmt_base.format(u, v)) * Math.sin(v) * Math.sin(u);
}

function calc_y(u, v) {
    return eval(eval_fmt_base.format(u, v)) * Math.sin(v) * Math.cos(u);
}

function calc_z(u, v) {
    return eval(eval_fmt_base.format(u, v)) * Math.cos(v);
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
                '#555555'
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
            // shading: 'albedo',
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
            shading: 'color',
            equation: {
                x: {
                    step: 2,
                    min: -2,
                    max: 2
                },
                y: {
                    step: 2,
                    min: -2,
                    max: 2
                },
                z: function (x, y) {
                    return 0;
                }
            }
        },
        {
            type: 'line3D',
            data: [[-2, 0, 2], [0, 0, 0]],
            lineStyle: {
                width: 4
            }
        }
    ]
};