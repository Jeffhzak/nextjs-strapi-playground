module.exports = (plugin) => {
  
  plugin.controllers.user.publicfind = async (ctx) => {
    // console.log("custom route: ", ctx.params)
    const { id } = ctx.params;
    const entity = await strapi.entityService.findOne("plugin::users-permissions.user", id, {populate: "avatar"});
    console.log(entity);
    const publicUserInfo = {
      id: entity.id,
      username: entity.username,
      blocked: entity.blocked,
      createdAt: entity.createdAt,
      avatar: entity.avatar,
    }
    return (publicUserInfo)
  }

  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/user/publicfind/:id",
    handler: "user.publicfind",
    config: {
      auth: false,
    }
  })

  return plugin;
};

