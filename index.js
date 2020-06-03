const Discord = require('discord.js');
const client = new Discord.Client();
//Prefix
var prefix = "$"
//킬때
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(': $명령어 | $help', { type: 'WATCHING' })
});

//누구나 쓸수있는 명령어
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
        if (command === "ping") {
            message.channel.send('Pong!');
        }

        if (command === "serverinfo") {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0DF36D')
            .setTitle(`${message.guild.name}`)
            .setDescription(`유저 수: ${message.guild.memberCount}\n주인: ${message.guild.owner}\n서버지역: ${message.guild.region}\n창시일: ${message.guild.createdAt}`)
            .setTimestamp()
            .setFooter('Powered by NastyCore | 브렛 못생김')

            message.channel.send(exampleEmbed);
        }

        if (command === 'help' || command === '도움말') {
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#34d8eb')
            .setTitle('Help | 명령어 도움말')
            .setDescription(`**일반 명령어**

ping
사용법: \`\`$ping\`\` : Pong을 불러옴
serverinfo
사용법: \`\`$serverinfo\`\` : 서버의 정보를 불러옴
            
**관리자용 명령어**
            
kick
사용법: \`\`$kick @user\`\` : 맨션된 유저를 킥
ban
사용법: \`\`$ban @user\`\` : 맨션된 유저를 벤
clear
사용법: \`\`$clear 숫자\`\` : 숫자만큼의 글을 삭제함`)
            .setThumbnail('https://i.pinimg.com/originals/5c/44/6c/5c446c03dbaf98fd3acc796e0e389ef1.gif')
            .setTimestamp()
            .setFooter('Powered by NastyCore');

            message.channel.send(exampleEmbed);
        }
            //킥명령어 시작
            if (command.startsWith("kick") || command.startsWith("킥")){
                if (message.member.hasPermission(['KICK_MEMBERS'])) {
                   var user = message.mentions.users.first();
                        if (user) {
                            var pingmember = message.guild.member(user)
                            if (pingmember) {
                                if (pingmember.kickable) {
                                    pingmember.send(`${message.guild.name}에서 킥당하셨습니다`)
                                    pingmember.kick();
                                    message.channel.send('킥 성공!')
                                }
                                 else {
                                    message.reply('킥할수 없는 유저입니다');
                                }
                            }
                        }
                        else {
                            message.reply("킥할 유저를 맨션해주세요.")
                        }
                }
                else {
                    message.reply("권한이 없습니다")
                }
            }
            //킥명령어 끝
            //벤명령어 시작
            if (command.startsWith("ban") || command.startsWith("벤")) {
                if (message.member.hasPermission(['BAN_MEMBERS'])) {
                    var user = message.mentions.users.first();
                         if (user) {
                             var pingmember = message.guild.member(user)
                             if (pingmember) {
                                 if (pingmember.bannable) {
                                     pingmember.send(`${message.guild.name}에서 벤당하셨습니다`)
                                     pingmember.ban();
                                     message.channel.send('벤 성공!')
                                 }
                                 else {
                                     message.reply('벤할수 없는 유저입니다');
                                 }
                             }
                         }
                         else {
                             message.reply("벤할 유저를 맨션해주세요")
                         }
                 }
                 else {
                     message.reply("권한이 없습니다")
                 }
            }
            //벤명령어 끝
            //삭제 명령어
            if (command.startsWith("clear") || command.startsWith("삭제")) {
                if (message.member.hasPermission(['MANAGE_MESSAGES'])) {
                    const amount = parseInt(args[0]);
                    message.channel.bulkDelete(amount, true);
                    message.reply(amount + ' 만큼의 글을 지웠습니다')
                }
                else {
                    message.reply("권한이 없습니다")
                }
            }
            //삭제명령어 끝

});

client.login('토큰여기에');