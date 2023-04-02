const options = [
    { label: ":zap:", type: "text", apply: ":zap:" },
    { label: ":smile:", type: "text", apply: ":smile:" },
    { label: ":frog:", type: "text", apply: ":frog:" },
    { label: ":fire:", type: "text", apply: ":fire:" },
    { label: ":heart:", type: "text", apply: ":heart:" },
    { label: ":rocket:", type: "text", apply: ":rocket:" },
    { label: ":thumbsup:", type: "text", apply: ":thumbsup:" },
    { label: ":raised_hands:", type: "text", apply: ":raised_hands:" },
    { label: ":bulb:", type: "text", apply: ":bulb:" },
    { label: ":tada:", type: "text", apply: ":tada:" },
    { label: ":star:", type: "text", apply: ":star:" },
    { label: ":eyes:", type: "text", apply: ":eyes:" },
    { label: ":thinking:", type: "text", apply: ":thinking:" },
    { label: ":sunglasses:", type: "text", apply: ":sunglasses:" },
    { label: ":muscle:", type: "text", apply: ":muscle:" },
    { label: ":v:", type: "text", apply: ":v:" },
    { label: ":pray:", type: "text", apply: ":pray:" },
    { label: ":rainbow:", type: "text", apply: ":rainbow:" },
    { label: ":pizza:", type: "text", apply: ":pizza:" },
    { label: ":coffee:", type: "text", apply: ":coffee:" },
    { label: ":smiley:", type: "text", apply: ":smiley:" },
    { label: ":laughing:", type: "text", apply: ":laughing:" },
    { label: ":heart_eyes:", type: "text", apply: ":heart_eyes:" },
    { label: ":sweat_smile:", type: "text", apply: ":sweat_smile:" },
    { label: ":wink:", type: "text", apply: ":wink:" },
    { label: ":blush:", type: "text", apply: ":blush:" },
    { label: ":yum:", type: "text", apply: ":yum:" },
    { label: ":sunglasses:", type: "text", apply: ":sunglasses:" },
    { label: ":heart_eyes_cat:", type: "text", apply: ":heart_eyes_cat:" },
    { label: ":dog:", type: "text", apply: ":dog:" },
    { label: ":unicorn:", type: "text", apply: ":unicorn:" },
    { label: ":ghost:", type: "text", apply: ":ghost:" },
    { label: ":skull:", type: "text", apply: ":skull:" },
    { label: ":bomb:", type: "text", apply: ":bomb:" },
    { label: ":money_with_wings:", type: "text", apply: ":money_with_wings:" },
    { label: ":crown:", type: "text", apply: ":crown:" },
    { label: ":star2:", type: "text", apply: ":star2:" },
    { label: ":sos:", type: "text", apply: ":sos:" },
    { label: ":clap:", type: "text", apply: ":clap:" },
    { label: ":fireworks:", type: "text", apply: ":fireworks:" },
    { label: ":robot:", type: "text", apply: ":robot:" },
    { label: ":alien:", type: "text", apply: ":alien:" },
    { label: ":santa:", type: "text", apply: ":santa:" },
    { label: ":clown_face:", type: "text", apply: ":clown_face:" },
    { label: ":octopus:", type: "text", apply: ":octopus:" },
    { label: ":penguin:", type: "text", apply: ":penguin:" },
    { label: ":sunflower:", type: "text", apply: ":sunflower:" },
    { label: ":volcano:", type: "text", apply: ":volcano:" },
    { label: ":wind_chime:", type: "text", apply: ":wind_chime:" },
    { label: ":butterfly:", type: "text", apply: ":butterfly:" },
    { label: ":teddy_bear:", type: "text", apply: ":teddy_bear:" },
    { label: ":nerd_face:", type: "text", apply: ":nerd_face:" },
    { label: ":brain:", type: "text", apply: ":brain:" },
    { label: ":dna:", type: "text", apply: ":dna:" },
    { label: ":mortar_board:", type: "text", apply: ":mortar_board:" },
    { label: ":artist:", type: "text", apply: ":artist:" },
    { label: ":guard:", type: "text", apply: ":guard:" },
    { label: ":detective:", type: "text", apply: ":detective:" },
    { label: ":construction_worker:", type: "text", apply: ":construction_worker:" },
    { label: ":farmer:", type: "text", apply: ":farmer:" },
    { label: ":scientist:", type: "text", apply: ":scientist:" },
    { label: ":teacher:", type: "text", apply: ":teacher:" },
    { label: ":eagle:", type: "text", apply: ":eagle:" },
    { label: ":gorilla:", type: "text", apply: ":gorilla:" },
    { label: ":sloth:", type: "text", apply: ":sloth:" },
    { label: ":tiger:", type: "text", apply: ":tiger:" },
    { label: ":whale:", type: "text", apply: ":whale:" },
    { label: ":duck:", type: "text", apply: ":duck:" },
    { label: ":owl:", type: "text", apply: ":owl:" },
    { label: ":shark:", type: "text", apply: ":shark:" },
    { label: ":snail:", type: "text", apply: ":snail:" },
    { label: ":paw_prints:", type: "text", apply: ":paw_prints:" },
    { label: ":cactus:", type: "text", apply: ":cactus:" },
    { label: ":coffee:", type: "text", apply: ":coffee:" },
    { label: ":beer:", type: "text", apply: ":beer:" },
    { label: ":cocktail:", type: "text", apply: ":cocktail:" },
    { label: ":wine_glass:", type: "text", apply: ":wine_glass:" },
    { label: ":pizza:", type: "text", apply: ":pizza:" },
    { label: ":hamburger:", type: "text", apply: ":hamburger:" },
    { label: ":taco:", type: "text", apply: ":taco:" },
    { label: ":sushi:", type: "text", apply: ":sushi:" },
    { label: ":cake:", type: "text", apply: ":cake:" },
    { label: ":doughnut:", type: "text", apply: ":doughnut:" },
    { label: ":ice_cream:", type: "text", apply: ":ice_cream:" },
    { label: ":lollipop:", type: "text", apply: ":lollipop:" },
    { label: ":sparkles:", type: "text", apply: ":sparkles:" },
    { label: ":rainbow_flag:", type: "text", apply: ":rainbow_flag:" },
    { label: ":star_and_crescent:", type: "text", apply: ":star_and_crescent:" },
    { label: ":peace_symbol:", type: "text", apply: ":peace_symbol:" },
    { label: ":wheelchair:", type: "text", apply: ":wheelchair:" },
    { label: ":microphone:", type: "text", apply: ":microphone:" },
    { label: ":camera:", type: "text", apply: ":camera:" },
    { label: ":sunrise_over_mountains:", type: "text", apply: ":sunrise_over_mountains:" },
    { label: ":tent:", type: "text", apply: ":tent:" },
    { label: ":football:", type: "text", apply: ":football:" },
    { label: ":basketball:", type: "text", apply: ":basketball:" },
    { label: ":baseball:", type: "text", apply: ":baseball:" },
    { label: ":volleyball:", type: "text", apply: ":volleyball:" },
    { label: ":rugby_football:", type: "text", apply: ":rugby_football:" },
    { label: ":dart:", type: "text", apply: ":dart:" },
    { label: ":fishing_pole_and_fish:", type: "text", apply: ":fishing_pole_and_fish:" },
    { label: ":guitar:", type: "text", apply: ":guitar:" },
    { label: ":trumpet:", type: "text", apply: ":trumpet:" },
    { label: ":saxophone:", type: "text", apply: ":saxophone:" },
    { label: ":violin:", type: "text", apply: ":violin:" },
    { label: ":drum:", type: "text", apply: ":drum:" },
    { label: ":helicopter:", type: "text", apply: ":helicopter:" },
    { label: ":rocket:", type: "text", apply: ":rocket:" },
    { label: ":satellite:", type: "text", apply: ":satellite:" },
    { label: ":earth_africa:", type: "text", apply: ":earth_africa:" },
    { label: ":ferris_wheel:", type: "text", apply: ":ferris_wheel:" },
    { label: ":roller_coaster:", type: "text", apply: ":roller_coaster:" },
    { label: ":carousel_horse:", type: "text", apply: ":carousel_horse:" },
    { label: ":sailboat:", type: "text", apply: ":sailboat:" },
    { label: ":speedboat:", type: "text", apply: ":speedboat:" },
    { label: ":motorboat:", type: "text", apply: ":motorboat:" },
    { label: ":ship:", type: "text", apply: ":ship:" },
    { label: ":airplane:", type: "text", apply: ":airplane:" },
    { label: ":steam_locomotive:", type: "text", apply: ":steam_locomotive:" },
    { label: ":train2:", type: "text", apply: ":train2:" },
    { label: ":metro:", type: "text", apply: ":metro:" },
    { label: ":taxi:", type: "text", apply: ":taxi:" },
    { label: ":moyai:", type: "text", apply: ":moyai:" },
    { label: ":satisfied:", type: "text", apply: ":satisfied:" },
    { label: ":rage:", type: "text", apply: ":rage:" },
    { label: ":zzz:", type: "text", apply: ":zzz:" },
    { label: ":punch:", type: "text", apply: ":punch:" },
    { label: ":question:", type: "text", apply: ":question:" },
];

module.exports = options;