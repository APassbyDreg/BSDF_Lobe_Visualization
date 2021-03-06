// string formater
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

let opt_3d = base_opt_3d;
let opt_2d = base_opt_2d;

let appconf = {
    data() {
        return {
            bsdf_func_editor: null,
            bsdf_func_str: "return 1;",
            custom_vars: ["phi_o", "theta_o", "phi_i", "theta_i"],
            custom_vals: ["N/A", "N/A", 270, 45],
            chart_3d: null,
            chart_2d: null,
            exist_error: false,
            err_msg: ""
        }
    },
    methods: {
        add_param: function () {
            this.custom_vars.push("new_var_" + (this.custom_vars.length - 4));
            this.custom_vals.push(0);
        },
        delete_param: function (idx) {
            if (idx >= 4) {
                this.custom_vars.pop(idx);
                this.custom_vals.pop(idx);
            }
        },
        update_vis: function () {
            this.bsdf_func_str = this.editor.getValue();
            let phi = parseFloat(this.custom_vals[2]) / 180 * Math.PI;
            let theta = parseFloat(this.custom_vals[3]) / 180 * Math.PI;
            const r = 100;
            eval_fmt_base = this.bsdf_eval_str;
            opt_3d.series[2].data[0].value = [
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.cos(theta),
            ];

            try {
                eval(utils.format("function") + eval_fmt_base.format(0, 0));
                this.exist_error = false;
                rmax = 0;
                this.chart_3d.showLoading();
                this.chart_3d.setOption(opt_3d);
                opt_3d.xAxis3D.min = -rmax * 1.5;
                opt_3d.xAxis3D.max = rmax * 1.5;
                opt_3d.yAxis3D.min = -rmax * 1.5;
                opt_3d.yAxis3D.max = rmax * 1.5;
                opt_3d.zAxis3D.min = -rmax * 1.5;
                opt_3d.zAxis3D.max = rmax * 1.5;
                opt_3d.series[1].equation.x.step = 3 * rmax;
                opt_3d.series[1].equation.x.min = -1.5 * rmax;
                opt_3d.series[1].equation.x.max = 1.5 * rmax;
                opt_3d.series[1].equation.y.step = 3 * rmax;
                opt_3d.series[1].equation.y.min = -1.5 * rmax;
                opt_3d.series[1].equation.y.max = 1.5 * rmax;
                this.chart_3d.setOption(opt_3d);
                this.chart_3d.hideLoading();
            } catch (error) {
                this.exist_error = true;
                this.err_msg = error;
            }
        },
    },
    computed: {
        bsdf_eval_str: function () {
            var f = this.bsdf_func_def + " {\n";
            f += this.bsdf_func_str;
            f += "\n}\n" + this.bsdf_func_call;
            return f;
        },
        bsdf_func_def: function () {
            let f = "function calcBSDF(";
            this.custom_vars.forEach(v => { f += v + ","; });
            ;
            return f.substring(0, f.length - 1) + ")";
        },
        bsdf_func_call: function () {
            var c = "calcBSDF({0},{1}";
            c += "," + this.custom_vals[2] / 180 * Math.PI + "," + this.custom_vals[3] / 180 * Math.PI;
            this.custom_vals.slice(4).forEach(v => { c += "," + v });
            return c + ");";
        },
    },
    mounted: function () {
        // setup chart
        this.chart_3d = echarts.init(document.getElementById("chart-3d"));
        this.chart_2d = echarts.init(document.getElementById("chart-2d"));
        this.chart_3d.setOption(opt_3d);
        this.chart_2d.setOption(opt_2d);

        // setup editor
        this.editor = ace.edit("code-body");
        this.editor.setTheme("ace/theme/xcode");
        this.editor.session.setMode("ace/mode/javascript");

        this.update_vis();
    }
}


let app = Vue.createApp(appconf).mount("#app");

