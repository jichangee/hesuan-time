import * as React from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Space } from 'antd';
import './style.css';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export default function App() {
  const [currentDate, setCurrentDate] = React.useState();
  const [intervalHours, setIntervalHours] = React.useState(24 * 7);
  const [actionType, setActionType] = React.useState(2); // 核酸采集时间 0 - 每天  1 - 单号  2 - 双号
  const [nextDate, setNextDate] = React.useState('');
  const getNextDate = (current) => {
    let $d = dayjs(current).add(intervalHours, 'h');
    if (actionType === 0) {
      return $d.format(DATE_FORMAT);
    }
    console.log('$d', $d.format(DATE_FORMAT));
    $d = getValidate($d, actionType === 1);
    return $d.format(DATE_FORMAT);
  };

  const getValidate = ($d, odd) => {
    if (isOdd($d) === !odd) {
      return getValidate($d.subtract(24, 'h'), odd);
    }
    return $d;
  };
  const isOdd = ($d) => {
    return +$d.format('D') % 2 === 1;
  };
  const onDateChange = (m, value) => {
    console.log('value', value);
    setCurrentDate(value);
  };
  React.useEffect(() => {
    setNextDate(getNextDate(currentDate));
  }, [currentDate]);
  return (
    <div className="main">
      <h2>Next Time: {nextDate}</h2>
      <Space>
        <DatePicker format={DATE_FORMAT} showTime onChange={onDateChange} />
      </Space>
    </div>
  );
}
