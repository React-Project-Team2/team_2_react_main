import AWS from 'aws-sdk';
import uuid from 'react-uuid';

export const configureAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
};

// 이미지 삭제 (fileList, Set타입 리스트, delete or other, 디렉토리 이름)
export const deleteImages = async (fileList, myImages, confirm, dirName) => {
  let deleteList = (confirm !== 'delete' ? fileList.filter((item) => { return !myImages.has(item) }) : fileList);

  if (deleteList.length !== 0) {
    try {

      const myBucket = new AWS.S3({
        params: { Bucket: 'my-react-team-project', },
        region: 'ap-northeast-2',
      });

      const params = {
        Bucket: 'my-react-team-project',
        Delete: {
          Objects: deleteList.map((item) => ({ Key: dirName + '/' + item }))
        },
      };

      await myBucket.deleteObjects(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("삭제성공 : ", data);
        }
      });

    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("deleteList가 없음");
  }
}

// 이미지 url 가져오기
export const getImageUrl = async (formData, userName, dirName) => {
  try {

    const myBucket = new AWS.S3({
      params: { Bucket: 'my-react-team-project', },
      region: 'ap-northeast-2',
    });

    const keyName = userName + '_uid_' + uuid() + '_iName_' + formData.get('image').name;

    const params = {
      Bucket: 'my-react-team-project',
      ContentType: 'images/jpeg',
      Key:  dirName + '/' + keyName,
      Body: formData.get('image'),
      ACL: 'public-read'
    };

    const imageURL = await myBucket.upload(params).promise().then((response) => response.Location);

    const result = {
      imageURL: imageURL,
      keyName : keyName
    }

    return result ;

  } catch (error) {
    console.log(error);
  }
}

// content에서 S3에 저장된 형식의 이미지이름만 추출
export const extractionValue = (items, nickname) => {
  let imgList = items.map((item) => {
    if (item['insert'] && typeof item['insert'] === 'object' && item['insert'].hasOwnProperty('image')) {
      return nickname + '_uid_' + item['insert'].image.split('_uid_')[1];
    }
    return null;
  }).filter(Boolean); // falsy값 제거

  return imgList;
}