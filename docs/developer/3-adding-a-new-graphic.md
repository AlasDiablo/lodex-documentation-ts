# Adding a new graphic

You can add new formats to LODEX via [Vega-Lite](https://vega.github.io/vega-lite/) or [Vega](https://vega.github.io/vega)

Before adding a new graphic you need to know how to add a new [format](https://github.com/Inist-CNRS/lodex/wiki/Adding-a-new-format)

### Table of Contents

+ [Adding a Vega-Lite graphic](#Adding-a-Vega-Lite-graphic)
  + [Code organization (folder)](#Code-organization-(folder))
  + [Creating the models](#Creating-the-models)
  + [Create the view](#Create-the-view)
+ [Adding a Vega graphic](#Adding-a-Vega-graphic)
+ [Helper](#Helper)

## Adding a Vega-Lite graphic

### Code organization (folder)

+ Formats folder: `src/app/js/formats/vega-lite/component`
+ Models builder folder: `src/app/js/formats/vega-lite/models`
+ Models json folder: `src/app/js/formats/vega-lite/models/json`

Definition:

+ Formats are just a [format](https://github.com/Inist-CNRS/lodex/wiki/Adding-a-new-format)
+ Models builder are a javascript class that dynamically edit json Models
+ Models json are json file with the vega-lite spefication write into

### Creating the models

Before create the models builder you need to create a Vega-Lite specification with [Vega-Lite Editor](https://vega.github.io/editor/#/custom/vega-lite), after creating specification add it into the `Models json folder` with `.vl.json` for the file extension.

When specification is created, a builder must be constructed into the `Models builder folder`. This builder needs to extended the `BasicChart.js` .
You need also to import you json into your builder with using `require`.

#### After this step: your code must be close to this

*note: `buildSpec` comes from `BasicChart`. `widthIn` is the size of the html container*

```javascript
import BasicChart from './BasicChart';

class MyChart extends BasicChart {
    construtor() {
        super();
        this.model = require('./json/mychart.vl.json');
    }

    myFunction(parametter) {
        /*

        beautiful code here

        */
    }

    buildSpec(widthIn) {
        /*

        beautiful code here

        */
        return this.model;
    }
}
```

When you have your builder, a new format needs to be create in the corresponding folder.

### Create the view

With vega lite's builder, the view needs to be handle with a specific code (only in `render` and `mapStateToProps`).

#### mapStateToProps

The `mapStateToProps` needs to reorganized the data before being used by Vega-Lite.

```javascript
const mapStateToProps = (state, { formatData }) => {
    // return an empty object if formatData is undefined (this can be change if you need to edit data)
    if (!formatData) {
        return {};
    }
    // return the data with a normalized data format
    return {
        data: {
            values: formatData,
        },
    };
};
```

#### render

When you start the render of your graphic you need to create a new instance of your builder but this instance needs to be instantly `deepClone` to avoid the duplication of graph specification.

```javascript
const myChart = deepClone(new MyChart());
```

For the return you need to use `ContainerDimensions` for building the graphic in the return statement.

#### The render function must to look like that

```javascript
render() {
    // Get the data from mapStateToProps
    const data = this.props.data;

    // Create a new MyChart instance

    const myChart = deepClone(new MyChart());

    // Set all MyChart parameters chosed by the administrator

    myChart.myFunction(this.props.parametter);

    return (
        <div style={styles.container}>
            <ContainerDimensions>
                {/* Make the chart responsive */}
                {({ width }) => {
                    const spec = myChart.buildSpec(width);
                    return (
                        <CustomActionVegaLite
                            spec={spec}
                            data={data}
                            injectType={VEGA_LITE_DATA_INJECT_TYPE_A}
                        />
                    );
                }}
            </ContainerDimensions>
        </div>
    );
}
```

Note on `injectType`:
Most of the time you need to use `VEGA_LITE_DATA_INJECT_TYPE_A` for the injection type, because it's using the normalized data injection but in some case it can't be use.  If that case is encountered you must do create a new `INJECT_TYPE`. Inside of `CustomActionVegaLite` you add your new data injection type within the existing code. 

## Adding a Vega graphic

For Vega is the same step like preceding but parts of it are different:

+ Formats folder: `src/app/js/formats/vega/component`
+ Models builder folder: `src/app/js/formats/vega/models`
+ Models json folder: `src/app/js/formats/vega/models/json`
+ [Vega Editor](https://vega.github.io/editor/#/custom/vega)
+ `BasicChart.js` do not exist for the Vega version but normally you can extended it
+ Instead of `CustomActionVegaLite` use `CustomActionVega`
+ Instead of `vl.json` use `vg.json`

## Helper

+ [ToolTips.js](https://github.com/Inist-CNRS/lodex/blob/master/src/app/js/formats/shared/ToolTips.js)
  + `ToolTips.js` provide an eays way to manage custom tool tip in your code
    + This class provide support for tooltip with 2 or 3 field
  + Exemple: [PieChartAdmin.js](https://github.com/Inist-CNRS/lodex/blob/22ec4ee3d775961edfebf888a5d9aed51964abe2/src/app/js/formats/vega-lite/component/pie-chart/PieChartAdmin.js#L110-L119)

+ [chartUtils.js](https://github.com/Inist-CNRS/lodex/blob/master/src/app/js/formats/chartsUtils.js)
  + `chartUtils.js` is a directory that contains a lot of useful constants/functions to standardize the code.
  + List of useful constants/functions
    + `lodexScaleToIdScale`: Convert the scale notation of lodex into an ID
    + `lodexOrderToIdOrder`: Convert the value order notation of lodex into an ID
    + `VALUES_ASC`: ID for an order by value with an ascending direction
    + And more...
  + Exemple: [BarChartView.js](https://github.com/Inist-CNRS/lodex/blob/22ec4ee3d775961edfebf888a5d9aed51964abe2/src/app/js/formats/vega-lite/component/bar-chart/BarChartView.js#L40-L71)
