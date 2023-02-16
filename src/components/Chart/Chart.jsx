import ChartBar from './ChartBar';
import './Chart.css';


const Chart = props => {
    //transform object to data point value number
const dataPointValues =  props.dataPoints.map(dataPoint => dataPoint.value);
//spread array
const totalMaximum = Math.max(...dataPointValues)

return (<div className='chart'>
{props.dataPoints.map(dataPoint =>
    <ChartBar
    key={dataPoint.label} 
    value={dataPoint.value} 
    maxValue={totalMaximum}
    label={dataPoint.label}
    />)}
</div>);
}

export default Chart;