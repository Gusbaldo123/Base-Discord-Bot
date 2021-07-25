module.exports = {
  commands: function (message, config) {
    var args = message.content.slice(config.Prefix.length).trim().split(/ +/g);
    var command_Text = args.shift().toLowerCase();

    var command_Executor = [
      require("./Help"),
      require("./Ping")
    ];

    var command_List = require("./command_List");
    var com_Li = Object.keys(command_List);

    switch (command_Text) {
      case com_Li[0]:
        command_Executor[0].Help(message, args, config, command_List);
        break;
      case com_Li[1]:
        command_Executor[1].Ping(message, args);
        break;
    }
  }
}