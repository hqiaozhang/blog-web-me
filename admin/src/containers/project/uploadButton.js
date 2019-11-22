import React from 'react';
import {connect} from 'react-redux';
import {Upload, Icon, message} from 'antd';
import {requestUploadimgProject} from '@/actions/project';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
const mapStateToProps = ({project}) => ({
  imageurl: project.imageurl,
});
@connect(mapStateToProps)
export default class Avatar extends React.Component {
  state = {
    loading: false,
    fileList: [''],
    file: null
  };

  handleChange = info => {
    this.setState({
      file: info.file
    });
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageurl =>
        this.setState({
          imageurl,
          loading: false,
        }));
    }
  }
  submitUpload() {
    setTimeout(() => {
      this.props.dispatch(requestUploadimgProject(this.state.file));
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.imageurl !== nextProps.imageurl) {
      this.setState({
        imageurl: nextProps.imageurl,
        loading: false,
      });
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {imageurl, fileList} = this.state;
    return (
      <Upload
        name="file"
        listType="picture-card"
        showUploadList={false}
        multiple
        action="http://localhost:8086/backend/project/uploadImg"
        beforeUpload={beforeUpload}
        customRequest={this.submitUpload.bind(this)}
        onChange={this.handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
        {imageurl || this.props.imgurl ? <img src={imageurl || this.props.imgurl} alt="avatar" style={{width: '100%'}} /> : uploadButton}
      </Upload>
    );
  }
}
