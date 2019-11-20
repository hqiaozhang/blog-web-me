import React, {Component} from 'react';
import {DatePicker, Input, Icon, Button, Table, Progress, Slider, notification} from 'antd';
// import {ol} from 'ol';
import moment from 'moment';
import axios from 'axios';
// import 'openlayers/css/ol.css';
import playback from './images/playback.png';
import speedcar from './images/car.png';
import move from './images/move.png';
import direction from './images/direction.png';
import stop from './images/stop.png';
// import daemarker from './images/direction.png';
import './index.scss';


const RangePicker = DatePicker.RangePicker;

//地图上原先的vector
let prevVector;
//确定地图放缩级别
const zoomSize = [100, 200, 500, 1000, 2000, 8000, 14000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000];
const zoomlevel = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3];

class CarMove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [], //table的表头信息
      DAENumber: '', //默认的编号
      DAEStatus: '', //默认的状态
      DEAAddress: '', //默认的地址
      queryKeyWord: this.props.keyword === undefined ? '' : this.props.keyword, //用户输入的查询关键字
      pathTableData: [], //table中的数据
      scrollPathTableHeight: '', //设置table出现滑动条的高度
      userChooseStartTime: this.props.starttime === undefined ? '' : this.props.starttime, //用户选择的起始时间
      userChooseEndTime: this.props.endtime === undefined ? '' : this.props.endtime, //用户选择的结束时间
      defaultShowBtnFlag: this.props.showBtnFlag === undefined ? false : this.props.showBtnFlag, //用户传入是否显示返回按钮
      defaultModeFlag: this.props.modeFlag === undefined ? false : this.props.modeFlag, //区分用户进入方式
      tableBodyData: [], //默认查询到的数据的总条数
      showAdjustSpeed: false, //默认的调节小车行驶的进度条不显示
      carProgerss: 0, //默认的小车在轨迹上行驶的进度
      canRefreshAnimation: true, //默认小车的重新运动按钮可用
      mapCenterLongitude: 105.442574, //默认的地图显示中心的经度
      mapCenterLatitude: 28.871718, //默认的地图显示中心的纬度
      mapUrl: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'//默认的在线地图的服务地址
    };
    this.map = null; //定义的地图容器句柄
    this.marker = null; //默认点击出现弹出框
    this.index = 0; //默认的小车在轨迹的位置
    this.defaultCarSpeed = 12; //默认小车的行驶速度
  }

  //构造查询轨迹table的头信息
  // eslint-disable-next-line react/sort-comp
  generateTableHeaderData() {
    const columns = [
      {
        title: '采集时间', dataIndex: 'column0', key: '1', width: 150, align: 'center'
      },
      {
        title: '采集器序列号', dataIndex: 'column1', key: '2', width: 150, align: 'center'
      },
      {
        title: '位置', dataIndex: 'column2', key: '3', width: 180, align: 'center'
      }
    ];
    this.setState({
      columns
    });
  }

    // 输入插叙的关键字
    userInputKeyWord = (e) => {
      this.setState({
        queryKeyWord: e.target.value
      });
    }

    //清空输入的查询关键词
    clearUserKeyWord = () => {
      this.setState({
        queryKeyWord: ''
      });
    }

    //用户选择查询的时间时
    userChangeQueryTime = (date, dateString) => {
      this.setState({
        userChooseStartTime: dateString[0],
        userChooseEndTime: dateString[1]
      });
    }

    //用户点击查询轨迹
    getPathDatas = () => {
      let mapData = [],
        tableData = [];
      const queryKey = this.state.queryKeyWord;
      //当用户选择的时间间隔超过三天的给出提示
      const startTime = this.state.userChooseStartTime;
      const endTime = this.state.userChooseEndTime;
      //把时间转化为毫秒，计算差值
      const time = new Date(endTime).getTime() - new Date(startTime).getTime();
      //必填项的校验
      if (queryKey === '' || queryKey == null) {
        notification.warn({
          message: '输入的车牌号或标签号不能为空',
          description: '请重新输入车牌号或者标签号进行查询',
          duration: 3,
          placement: 'bottomRight'
        });
        return;
      }
      if (startTime === '' || endTime === '') {
        notification.warn({
          message: '请选择查询的时间段',
          description: '查询的时间段不能为空，请重新选择时间进行查询',
          duration: 3,
          placement: 'bottomRight'
        });
        return;
      }
      if (time > 259200000) {
        notification.warn({
          message: '时间间隔不能超过三天',
          description: '查询的时间段不能超过三天，请重新选择时间进行查询',
          duration: 3,
          placement: 'bottomRight'
        });
        return;
      }

      //数据请求的方法
      const url = 'http://localhost:8080/getAllDaeInfo';
      // axios.get(url).then((response) => {
      //   console.log('response-------------->', response.data);
      // }).catch((error) => {
      //   console.log(error);
      // });


      let enterTime,
        daeStatus,
        longitude,
        latitude,
        maxDistance = 0,
        distance = 0;
      const carPathData = new Array();
      //生成模拟数据
      for (let i = 0; i < 20; i++) {
        const time = Date.now() + i * 1000;
        const carPathDataItem = {};
        carPathDataItem.collectTime = time;
        carPathDataItem.devStatus = 0;
        carPathDataItem.devId = `ts10001${i}`;
        carPathDataItem.devAddr = `XX市市测试区测试街道${i}`;
        carPathDataItem.longitude = 107.4425790689 + Math.random() * (i + 1) / 500;
        carPathDataItem.latitude = 29.8717183035 + Math.random() * (i + 1) / 500;
        carPathData.push(carPathDataItem);
      }


      for (let i = 0; i < carPathData.length; i++) {
        enterTime = moment(carPathData[i].collectTime).format('YYYY-MM-DD HH:mm:ss');
        if (carPathData[i].devStatus === 0) {
          daeStatus = '离线';
        } else {
          daeStatus = '在线';
        }
        //计算经纬度之间最大的距离
        if (i < carPathData.length - 1) {
          distance = this.getDistance(carPathData[i].latitude, carPathData[i].longitude, carPathData[i + 1].latitude, carPathData[i + 1].longitude);
          if (distance > maxDistance) {
            maxDistance = distance;
          }
        }
        //表格数据的构造
        tableData.push({
          key: `${i}`,
          column0: enterTime,
          column1: carPathData[i].devId,
          column2: carPathData[i].devAddr
        });
        longitude = carPathData[i].longitude;
        latitude = carPathData[i].latitude;
        //地图数据的构造
        mapData.push([longitude, latitude, carPathData[i].devId, daeStatus, carPathData[i].devAddr]);
      }

      if (mapData.length > 0) {
        let level = 13;
        //确定地图的放缩等级
        for (let i = 0; i < zoomSize.length; i++) {
          if (maxDistance > 100) {
            if (maxDistance < zoomSize[i]) {
              level = zoomlevel[i - 1];
              break;
            }
          } else if (maxDistance === 0) {
            level = 5;
            break;
          } else {
            level = 17;
            break;
          }
        }
        this.setState({
          tableBodyData: tableData,
          canRefreshAnimation: true
        });
        //每次添加新的坐标点时清空原先的坐标点
        this.map.removeLayer(prevVector);
        //清空以移动的小车
        this.map.un('postcompose', this.moveFeature);
        //当用户打开弹出窗口的时候，点击查询的情况情况
        this.closeMapMarker();
        this.map.getView().setZoom(level);
        //重新设置地图的中心(不设置的话小车移动报错)
        this.map.getView().setCenter(ol.proj.transform([mapData[0][0], mapData[0][1]], 'EPSG:4326', 'EPSG:3857'));
        this.generateCarMoveOnMap(mapData);
      } else {
        this.setState({
          tableBodyData: tableData,
          carProgerss: 0,
          canRefreshAnimation: false
        });
        //每次添加新的坐标点时清空原先的坐标点
        this.map.removeLayer(prevVector);
        //清空以移动的小车
        this.map.un('postcompose', this.moveFeature);
        //当用户打开弹出窗口的时候，点击查询的情况情况
        this.closeMapMarker();
        //重新设置地图的中心(不设置的话小车移动报错)
        this.map.getView().setCenter(ol.proj.transform([this.state.mapCenterLongitude, this.state.mapCenterLatitude], 'EPSG:4326', 'EPSG:3857'));
        this.generateCarMoveOnMap(mapData);
        notification.info({
          message: '没有查询到轨迹信息',
          description: '根据你输入车牌号或者标签号以及时间没有查询到信息',
          duration: 3
        });
      }
    }

    //计算经纬度之间的距离(单位米)
    getDistance = (lat1, lng1, lat2, lng2) => {
      const radLat1 = lat1 * Math.PI / 180.0;
      const radLat2 = lat2 * Math.PI / 180.0;
      const a = radLat1 - radLat2;
      const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s *= 6378.137;// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10;
      return s;
    }

    componentDidMount() {
      //设置表格默认滚动区域
      this.setState({
        scrollPathTableHeight: this.tableContrainer.clientHeight - 60
      });
      //监听窗口的放缩,动态的设置table出现出现滚动的高度
      window.onresize = () => {
        const tableContainer = this.tableContrainer;
        if (tableContainer) {
          const tableHeight = tableContainer.clientHeight - 60;
          this.setState({
            scrollPathTableHeight: tableHeight
          });
        }
      };
      //调用构造table头信息的函数
      this.generateTableHeaderData();

      //生成地图层
      const raster = new ol.layer.Tile({source: new ol.source.XYZ({url: this.state.mapUrl})});
      //总地图
      this.map = new ol.Map({
        target: 'pathMapContainer',
        layers: [raster],
        view: new ol.View({
          center: ol.proj.transform([this.state.mapCenterLongitude, this.state.mapCenterLatitude], 'EPSG:4326', 'EPSG:3857'),
          //指定地图投影类型
          projection: 'EPSG:3857',
          //定义地图显示的层级
          zoom: 13,
          maxZoom: 18,
          minZoom: 5
        })
      });
      //用户打开坐标显示
      this.openMapMarker(this.map);
    }

    //构造轨迹回放动画
    generateCarMoveOnMap = (coordinate) => {
      const that = this;
      //标记层

      const layer = new ol.layer.Vector({
        source: new ol.source.Vector()
      });
      const styles = {
        //线路的样式
        route: new ol.style.Style({stroke: new ol.style.Stroke({width: 5, color: '#66ACED'})}),
        //起点的样式
        start: new ol.style.Style({image: new ol.style.Icon({scale: 0.75, src: direction})}),
        //起点的样式
        end: new ol.style.Style({image: new ol.style.Icon({scale: 0.8, anchor: [0.5, 0.82], src: stop})}),
        //小车的样式
        geoMarker: new ol.style.Style({image: new ol.style.Icon({scale: 0.65, anchor: [0.5, 0.8], src: move})}),
        //真实点的样式
        point: new ol.style.Style({image: new ol.style.Icon({scale: 1, src: direction})})
      };

      let animating = false,
        now,
        speed;
      let routeCoords,
        routeLength,
        geoMarker;
      const startButton = document.getElementById('start-animation');
      let traversed = 0; //走过的路程
      let elapsedTime = 0; //用过的时间
      let retime = 0; //保存上次运动所用的时间
      console.log('coordinate', coordinate);
      if (coordinate.length > 2) {
        const geometry = new ol.geom.LineString([]);
        let anchor;
        const minScale = 0.001;
        let lngValue,
          latValue,
          times;
        const lnglatArray = new Array();
        //构造坐标点之间的线路
        for (let i = 0; i < coordinate.length; i++) {
          //构造坐标点的时候构造路径
          if (i > 0) {
            //构造坐标点之间的路径
            lngValue = coordinate[i][0] - coordinate[i - 1][0];
            latValue = coordinate[i][1] - coordinate[i - 1][1];
            //有一种特殊的情况当相邻的两个坐标点重合,或者当两个坐标点非常近的时候
            const zLength = Math.sqrt(lngValue * lngValue + latValue * latValue);
            if (zLength === 0 || Math.round(zLength / minScale) === 0) {
              geometry.appendCoordinate(ol.proj.transform([coordinate[i][0], coordinate[i][1]], 'EPSG:4326', 'EPSG:3857'));
            } else {
              times = Math.round(zLength / minScale);
              const xminScale = lngValue / times;
              const yminScale = latValue / times;
              for (let j = 0; j < times; j++) {
                lnglatArray[0] = coordinate[i - 1][0] + j * xminScale;
                lnglatArray[1] = coordinate[i - 1][1] + j * yminScale;
                // eslint-disable-next-line no-use-before-define
                anchor = setAnchorStyle(geometry, lnglatArray);
                layer.getSource().addFeature(anchor);
              }
            }
          }
        }

        //设置坐标点之间连线点的坐标
        // eslint-disable-next-line no-inner-declarations
        function setAnchorStyle(geometry, lnglatArray) {
          geometry.appendCoordinate(ol.proj.transform(lnglatArray, 'EPSG:4326', 'EPSG:3857'));
          const anchor = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform(lnglatArray, 'EPSG:4326', 'EPSG:3857'))
          });
          return anchor;
        }

        //标记小车运动轨迹上真实的坐标点
        const reallyGeometry = new ol.geom.LineString();
        //从第二个点到倒数第二个点
        for (let i = 1; i < coordinate.length - 1; i++) {
          reallyGeometry.appendCoordinate(ol.proj.transform([coordinate[i][0], coordinate[i][1]], 'EPSG:4326', 'EPSG:3857'));
        }
        const reallyCoords = reallyGeometry.getCoordinates();
        const reallyPoint = new Array();
        for (let i = 0; i < reallyCoords.length; i++) {
          //构造小车运动的线路上真实经过的坐标点
          reallyPoint.push(new ol.Feature({
            type: 'point',
            state: 0,
            num: coordinate[i + 1][2],
            status: coordinate[i + 1][3],
            address: coordinate[i + 1][4],
            geometry: new ol.geom.Point(reallyCoords[i])
          }));
        }

        routeCoords = geometry.getCoordinates();
        routeLength = routeCoords.length;

        //小车行走的线路
        const routeFeature = new ol.Feature({
          type: 'route',
          state: 1,
          geometry
        });
        //运动的小车
        geoMarker = new ol.Feature({
          type: 'geoMarker',
          state: 1,
          geometry: new ol.geom.Point(routeCoords[0])
        });
        //轨迹开始坐标
        const startMarker = new ol.Feature({
          type: 'start',
          state: 0,
          num: coordinate[0][2],
          status: coordinate[0][3],
          address: coordinate[0][4],
          geometry: new ol.geom.Point(routeCoords[0])
        });
        //轨迹终止坐标
        const endMarker = new ol.Feature({
          type: 'end',
          state: 0,
          num: coordinate[coordinate.length - 1][2],
          status: coordinate[coordinate.length - 1][3],
          address: coordinate[coordinate.length - 1][4],
          geometry: new ol.geom.Point(routeCoords[routeLength - 1])
        });

        //轨迹上所有的坐标的集合
        const vector = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [routeFeature, ...reallyPoint, geoMarker, startMarker, endMarker]
          }),
          style(feature) {
            if (animating && feature.get('type') === 'geoMarker') {
              return null;
            }
            return styles[feature.get('type')];
          }
        });

        //保存上一次的layer
        prevVector = vector;
        //在地图上添加坐标的点集
        that.map.addLayer(vector);

        // eslint-disable-next-line no-use-before-define
        startButton.addEventListener('click', startAnimation, false);
        // eslint-disable-next-line no-use-before-define
        setTimeout(() => startAnimation(), 50);
      } else if (coordinate.length > 0 && coordinate.length < 3) {
        //当做标点小于3个大于0个的时候
        const geometry = new ol.geom.LineString();
        for (let i = 0; i < coordinate.length; i++) {
          geometry.appendCoordinate(ol.proj.transform([coordinate[i][0], coordinate[i][1]], 'EPSG:4326', 'EPSG:3857'));
        }
        routeCoords = geometry.getCoordinates();
        routeLength = routeCoords.length;

        //小车行走的线路
        const routeFeature = new ol.Feature({
          type: 'route',
          state: 1,
          geometry
        });
        //运动的小车
        geoMarker = new ol.Feature({
          type: 'geoMarker',
          state: 1,
          geometry: new ol.geom.Point(routeCoords[0])
        });
        //轨迹开始坐标
        const startMarker = new ol.Feature({
          type: 'start',
          state: 0,
          num: coordinate[0][2],
          status: coordinate[0][3],
          address: coordinate[0][4],
          geometry: new ol.geom.Point(routeCoords[0])
        });
        //轨迹终止坐标
        const endMarker = new ol.Feature({
          type: 'end',
          state: 0,
          num: coordinate[coordinate.length - 1][2],
          status: coordinate[coordinate.length - 1][3],
          address: coordinate[coordinate.length - 1][4],
          geometry: new ol.geom.Point(routeCoords[routeLength - 1])
        });

        //轨迹上所有的坐标的集合
        const vector = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [routeFeature, geoMarker, startMarker, endMarker]
          }),
          style(feature) {
            if (animating && feature.get('type') === 'geoMarker') {
              return null;
            }
            return styles[feature.get('type')];
          }
        });

        //保存上一次的layer
        prevVector = vector;
        //在地图上添加坐标的点集
        that.map.addLayer(vector);

        // eslint-disable-next-line no-use-before-define
        startButton.addEventListener('click', startAnimation, false);
        // eslint-disable-next-line no-use-before-define
        setTimeout(() => startAnimation(), 50);
      }

      //小车运动函数
      this.moveFeature = function (event) {
        const vectorContext = event.vectorContext;
        const frameState = event.frameState;
        if (animating) {
          if (retime === 0) {
            elapsedTime = frameState.time - now;
          } else {
            elapsedTime = frameState.time - retime;
          }
          retime = frameState.time;
          const index = Math.round(that.defaultCarSpeed * elapsedTime / 1000);
          traversed += index;
          that.index = traversed;
          if (traversed >= routeLength) {
            //当小车运动到终点的时候
            // eslint-disable-next-line no-use-before-define
            moveEnd(true);
            return;
          }
          const currentPoint = new ol.geom.Point(routeCoords[traversed]);
          const feature = new ol.Feature(currentPoint);
          vectorContext.drawFeature(feature, styles.geoMarker);
        }
        //设置运动的进度条
        that.setState({
          carProgerss: Math.round((that.index + 1) / routeLength * 100)
        });
        that.map.render();
      };

      //开始小车的运动
      function startAnimation() {
        traversed = 0; //走过的路程
        elapsedTime = 0; //用过的时间
        retime = 0; //保存上次运动所用的时间
        if (animating) {
          // eslint-disable-next-line no-use-before-define
          refreshAnimation();
        } else {
          animating = true;
          now = new Date().getTime();
          //speed = that.defaultCarSpeed;
          geoMarker.setStyle(null);
          that.map.on('postcompose', that.moveFeature);
          that.map.render();
        }
      }

      //当小车运动到终点
      function moveEnd(isend) {
        animating = false;
        const coord = isend ? routeCoords[routeLength - 1] : routeCoords[0];
        (geoMarker.getGeometry()).setCoordinates(coord);
        //防止出现问题当调用次函数的时在设置一下进度条为100%
        that.setState({
          carProgerss: 100
        });
        that.map.un('postcompose', that.moveFeature);
      }

      //小车重新运动
      function refreshAnimation() {
        if (that.state.carProgerss === 100) {
          that.setState({
            carProgerss: 0
          });
        }
        animating = false;
        if (that.state.canRefreshAnimation) {
          startAnimation();
        }
      }
    }

    //显示调节小车运动速度
    adjustSpeed = () => {
      this.setState((prevState) => ({
        showAdjustSpeed: !prevState.showAdjustSpeed
      }));
    }

    //改变小车队的行驶速度
    setNewSpeed = (value) => {
      this.defaultCarSpeed = value + 4;
    }

    //关闭用户打开的显示框
    closeMapMarker = () => {
      this.marker.setPosition(undefined);
      return false;
    }

    //监听地图的点击事件
    openMapMarker = (map) => {
      const that = this;
      const element = that.alertContainer;
      that.marker = new ol.Overlay({
        element,
        positioning: 'bottom-center',
        stopEvent: true,
        offset: [-5, -24],
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });
      map.addOverlay(that.marker);
      const dom = document.createElement('div');
      dom.setAttribute('id', 'closeAlert');
      that.alertContainer.appendChild(dom);
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        if (feature) {
          //点击地图上大的坐标点的时候出现弹出框
          if (feature.get('state') === 0) {
            const coordinatePoint = feature.getGeometry().getCoordinates();
            that.marker.setPosition(coordinatePoint);
            //弹出框显示出来
            element.style.display = 'block';
            dom.onclick = that.closeMapMarker;
            that.setState({
              DAENumber: feature.get('num'),
              DAEStatus: feature.get('status'),
              DEAAddress: feature.get('address')
            });
          }
        }
      });
    }

    //返回上一级菜单
    goBackUpperLevel = () => {
      this.props.backPrevLavel(this.state.defaultModeFlag);
    }

    render() {
      const {queryKeyWord} = this.state;
      const suffix = queryKeyWord ? <Icon type="close-circle" onClick={this.clearUserKeyWord} /> : null;
      return (
        <div className="pathContainer">
          <div className="headerContainer">
            <Input
              placeholder="请输入车牌号进行查询"
              suffix={suffix}
              onChange={this.userInputKeyWord}
              value={queryKeyWord}
              className="userInputKeyWord"
            />
            <RangePicker
              onChange={this.userChangeQueryTime}
              format="YYYY-MM-DD HH:mm"
              showTime
              className="userSelectQueryTime"
              value={this.state.userChooseStartTime ? [moment(this.state.userChooseStartTime), moment(this.state.userChooseEndTime)] : null}
            />
            <Button onClick={this.getPathDatas} icon="search" className="queryButton">查询轨迹</Button>
          </div>
          <div className="displayContainer">
            <div className="displayLeftContainer">
              <div id="pathMapContainer" className="pathMapContainer">
                {this.state.defaultShowBtnFlag &&
                  <Button onClick={this.goBackUpperLevel} icon="left" className="goBack">返回</Button>}
                <div
                  className="alertContainer"
                  ref={(box) => {
                    this.alertContainer = box;
                  }}
                ><br />
                  <div className="alertItem">
                    <span className="alertSpan">采集器编号:</span><span
                      className="alertSpanValue"
                    >{this.state.DAENumber}</span>
                  </div>
                  <div className="alertItem">
                    <span className="alertSpan">采集器状态:</span><span
                      className="alertSpanValue"
                    >{this.state.DAEStatus}</span>
                  </div>
                  <div className="alertItem">
                    <span className="alertSpan">采集器地址:</span><span
                      className="alertSpanValue"
                    >{this.state.DEAAddress}</span>
                  </div>
                  <div className="triangleDown" />
                </div>
                <div className="adjustSpeed">
                  <img src={playback} className="imgSize" id="start-animation" />
                  <Progress percent={this.state.carProgerss} status="active" className="progress" />
                  <img src={speedcar} className="carImgSize" onClick={this.adjustSpeed} />
                  {this.state.showAdjustSpeed && <div className="adjustSlider">
                    <Slider
                      vertical
                      min={1}
                      defaultValue={this.defaultCarSpeed}
                      className="sliderChoose"
                      onChange={this.setNewSpeed}
                    />
                  </div>}
                </div>
              </div>
            </div>
            <div className="displayRightContainer">
              <div className="pathTitle">
                <span className="spanTitle">车辆轨迹查询</span>
              </div>
              <div
                className="pathTable"
                ref={(box) => {
                  this.tableContrainer = box;
                }}
              >
                <Table
                  pagination={false}
                  columns={this.state.columns}
                  dataSource={this.state.tableBodyData}
                  scroll={{y: this.state.scrollPathTableHeight}}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default CarMove;
