const notificationModel = require('../models/notification/notification');


exports.listNotifications = async (req, res, next) => {
  const {userid} = req.params;

  const notifications = await notificationModel.find({$or: [{user: userid}, {public: true}]});
  if(notifications){
    console.log(notifications);
    res.status(200).send(notifications);
  }else{
    console.log('something went wrong!');
  }
  
}

exports.createNotice = async (req, res, next) => {
  const {title, notice, notifier, user, public} = req.body;

  const notification = new notificationModel();
  
  notification.title = title;
  notification.notice = notice;
  notification.notifier = notifier;
  notification.user = user;
  notification.public = public;
  
  try{
    let new_notice = await notification.save();
    if(new_notice){
      res.status(201).send({msg: 'A new notice was created successfully!'});
      return;
    }
  }
  catch(error){
    console.log(error);
  }
  

}

exports.editNotice = async (req, res, next) => {
  const {id, title, notice, notifier, public, user} = req.body;

  const edited_notice = await notificationModel.findByIdAndUpdate(
    {_id: id}, 
    {title: title, notice: notice, notifier: notifier, public: public, user: user}, 
    {new: true}
  );

  if(edited_notice){
    console.log(edited_notice);
    res.status(200).send({updated_notice: edited_notice});
  }

}

exports.deleteNotice = async (req, res, next) => {
  const id = req.params.id
  try{
    const notice = await notificationModel.findByIdAndDelete({_id: id});
    if(notice){
      res.status(200).send({msg:"notice was deleted successfully", id: id});
      console.log(notice);
    }
  }
  catch(error){
    console.log(error);
  }
}