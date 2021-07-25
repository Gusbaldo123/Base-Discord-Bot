module.exports = {
    Help:function (message,args,config, command)
    {
        var p = config.Prefix;
        var b = "\n\t";
        let msge = "";
        var k = Object.keys(command);
        var v = Object.values(command);

        for (let i = 0; i < k.length; i++) {
            msge += b+p+k[i]+": "+v[i];
        }
        let msg = "autohotkey\n= Lista de comandos =\n" + msge;
        message.channel.send("```" + msg + "```");
    }
}