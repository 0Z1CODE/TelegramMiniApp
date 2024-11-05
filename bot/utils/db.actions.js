import User from './../../db/models/user.model.js';

export const getUser = async (ctx) => {
  const tgUser = ctx.from;
  const user = await User.findOne({ telegram_id: tgUser.id });
  if (tgUser && !user) {
    const newUser = new User({
      telegram_id: tgUser.id,
      ...tgUser,
    });
    await newUser.save();
 
  }
  return user;
};
