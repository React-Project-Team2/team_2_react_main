import AWS from 'aws-sdk';

export const configureAWS = () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
  });
};

// 이미지 삭제
export const deleteImages = async (fileList, myImages, confirm) => {
  let deleteList = (confirm !== 'delete' ? fileList.filter((item) => { return !myImages.has(item) }) : fileList);

  if (deleteList.length !== 0) {
    try {
      configureAWS();

      const myBucket = new AWS.S3({
        params: { Bucket: 'my-react-team-project', },
        region: 'ap-northeast-2',
      });

      const params = {
        Bucket: 'my-react-team-project',
        Delete: {
          Objects: deleteList.map((item) => ({ Key: 'images/' + item }))
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
export const getImageUrl = async (formData, keyName) => {
  try {
    configureAWS();

    const myBucket = new AWS.S3({
      params: { Bucket: 'my-react-team-project', },
      region: 'ap-northeast-2',
    });

    const params = {
      Bucket: 'my-react-team-project',
      ContentType: 'images/jpeg',
      Key: 'images/' + keyName,
      Body: formData.get('image'),
      ACL: 'public-read'
    };

    const imageURL = await myBucket.upload(params).promise().then((response) => response.Location);

    console.log(imageURL);

    return imageURL;

  } catch (error) {
    console.log(error);
  }
}