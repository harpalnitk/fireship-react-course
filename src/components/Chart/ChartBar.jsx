
import './ChartBar.css';

const ChartBar = (props) => {

    let barFillHeight = '0%';
    if(props.maxValue > 0){
       barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
    }
  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        <div className='chart-bar__fill'
        //inside curly braces is javascript object
        // no double curly braces
        // style={{height:barFillHeight,'backgroud-color':'red'}}></div>
         style={{height:barFillHeight}}></div>
      </div>
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
};

export default ChartBar;
