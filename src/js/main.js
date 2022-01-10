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
            exist_error: false
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
            let phi = parseFloat(this.custom_vals[2]) / 180 * Math.PI;
            let theta = parseFloat(this.custom_vals[3]) / 180 * Math.PI;
            const r = 3;
            eval_fmt_base = this.bsdf_eval_str;
            opt_3d.series[2].data[0] = [
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.sin(theta) * Math.cos(phi),
                r * Math.cos(theta),
            ];
            console.log(phi, theta);
            this.chart_3d.setOption(opt_3d);
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
        this.editor.setValue("return 1;", 0);
        this.editor.on("change", () => {
            this.bsdf_func_str = this.editor.getValue();
        });

        this.update_vis();
    }
}


let app = Vue.createApp(appconf)
    .component("v-chart", VueECharts)
    .component("v-slider", window['vue-slider-component'])
    .mount("#app");
