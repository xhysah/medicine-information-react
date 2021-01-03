import React, { memo, useState } from 'react'

import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default memo(function (props) {
  const { name, setImgUrl, imgUrl, imgsrc } = props
  const [fileList, setFileList] = imgsrc? useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: imgsrc,
    }
  ]): useState([])

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const handleChange = ({ fileList,file }) => {
    if(file.response){
      console.log(file)
      setImgUrl({[imgUrl]: `http://localhost:3000/${file.response.path.slice(7)}`})
    }
    setFileList([...fileList])
  }

  function beforeUpload(file) {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('请上传图片');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片的大小需要小于2MB');
    }
    return isLt2M;
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const getExtraData = file => {
    return {
      url: name,
    };
  };
  const prop = {
    width: 500,  //裁剪宽度
    height: 300, //裁剪高度
    resize: false, //裁剪是否可以调整大小
    resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
    modalTitle: "上传图片", //弹窗标题
    modalWidth: 600, //弹窗宽度
    modalOk: '确定',
    modalCancel: '取消'
  };
  const action = `http://localhost:3000/upload`
  return (
    <>
    <ImgCrop {...prop}>
      <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          onChange={handleChange}
          data={getExtraData}
          headers={{
            'Authorization': localStorage.getItem('token')
        }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </ImgCrop>
    </>
  )
})
