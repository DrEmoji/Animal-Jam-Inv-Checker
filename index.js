import { AnimalJamClient } from './animaljam.js/dist/index.js'
import { blue, green, yellow } from 'colorette';
import { askQuestion, loadJsonFile, loadJson, CheckClothWorth, sleep } from './utils.js';


console.log(blue("Created By Doc/Dremoji"));

let clothing;

(async () => {
    clothing = await loadJsonFile("./defpacks/1000-clothing.json");
    let userData = null;
    let nextpacket = false;
    const details = await askQuestion("details (username:password): ");
    const [screen_name, password] = details.split(":");

    const client = new AnimalJamClient()

    const flashvars = await client.flashvars.fetch()

    const { auth_token } = await client.authenticator.login({
        screen_name: screen_name,
        password: password,
    })

    if (auth_token == undefined) {
      console.log("AUTH FAILED!!!!!")
      while (true) { await sleep(1000); }
    }

    const networking = await client.networking.createClient({
        host: flashvars.smartfoxServer,
        port: flashvars.smartfoxPort,

        auth_token: auth_token,
        screen_name: screen_name,
        deploy_version: flashvars.deploy_version,
    })


    await networking.connect()
    console.log('Connected to server!')

    networking.on('message', async (message) => {
        const msg = message.toMessage();

        if (msg.includes("playerWallSettings")) {
            const jsonData = await loadJson(msg);
            userData = jsonData?.b?.o?.params ?? null;
        }

        if (msg.includes("il") && nextpacket) {
            nextpacket = false;
            const splits = msg.split("%");
            for (let i = 6; i < splits.length; i += 5) {
                if (i > 11) {
                    const id = splits[i];
                    if (clothing.hasOwnProperty(id)) {
                        const item = clothing[id]
                        const name = item["name"];
                        if (CheckClothWorth(name)) {
                            console.log(blue(name));
                        }
                        else if (item["membersOnly"] == "1") {
                            console.log(yellow(name));
                        } else {
                            console.log(name);
                        }
                    }
                }
            }
        }
    })

    networking.on('ready', async () => {
        await sleep(500);
        console.log("Diamonds: " + green(userData.diamondsCount))
        console.log("Gems: " + green(userData.gemsCount))
        nextpacket = true;
        await networking.sendXTMessage(["ad", "-1", screen_name, userData.perUserAvId, 1]);
    });
})()
