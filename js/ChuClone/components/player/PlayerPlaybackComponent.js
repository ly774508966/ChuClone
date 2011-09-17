/**
File:
	PlayerPlaybackComponent.js
Created By:
	Mario Gonzalez
Project	:
	RealtimeMultiplayerNodeJS
Abstract:
 	Records a players keyboard state to enable playback of a level
 Basic Usage:

 License:
   Creative Commons Attribution-NonCommercial-ShareAlike
   http://creativecommons.org/licenses/by-nc-sa/3.0/

*/
(function(){
    "use strict";

	ChuClone.namespace("ChuClone.components.player");

	var PTM_RATIO = ChuClone.model.Constants.PTM_RATIO;
	ChuClone.components.player.PlayerPlaybackComponent = function() {
		ChuClone.components.player.PlayerPlaybackComponent.superclass.constructor.call(this);
		this.requiresUpdate = true;

		/*


		 */
		this._record = JSON.parse('[{"t":0,"x":1.44830649226694,"y":-0.18884757907997196,"rotation":1.9358994104609635},{"t":133,"x":1.45809849226694,"y":-0.015447579079971963,"rotation":1.9358994104609635},{"t":333,"x":2.0633670069667622,"y":0.8351815465232658,"rotation":2.0069564393968626},{"t":533,"x":3.0083560739713593,"y":0.9519712472210652,"rotation":3.0243401597809814},{"t":734,"x":4.614363928231142,"y":0.8980011401750173,"rotation":5.386216532821678},{"t":934,"x":6.244398353872824,"y":0.7417633842596548,"rotation":7.142329135970418},{"t":1134,"x":8.95992855971495,"y":-2.373527257134789,"rotation":8.533170385039181},{"t":1335,"x":12.86769391950475,"y":-5.291049757134785,"rotation":9.799072118027587},{"t":1535,"x":17.289693919504753,"y":-8.940647257134781,"rotation":11.189488775572228},{"t":1736,"x":18.922185894180437,"y":-8.014934838467994,"rotation":9.42649011401964},{"t":1936,"x":20.919606621278216,"y":-6.088376191402566,"rotation":7.776273616998289},{"t":2138,"x":24.05940568189032,"y":-3.1409861734754667,"rotation":5.940271156736124},{"t":2354,"x":28.04610763949394,"y":-0.7307979714132644,"rotation":4.462455575742718},{"t":2554,"x":32.085037817402224,"y":-4.3001979714132625,"rotation":3.5953760033519337},{"t":2755,"x":36.13303781740223,"y":-6.853917971413259,"rotation":2.728296430961151},{"t":2971,"x":40.86303781740223,"y":-8.551707971413256,"rotation":1.7151328001784427},{"t":3172,"x":44.207037817402245,"y":-8.914467971413252,"rotation":0.9988496751599706},{"t":3372,"x":47.92503781740226,"y":-7.486437971413249,"rotation":0.20245593747495794},{"t":3573,"x":51.621037817402275,"y":-4.213437971413244,"rotation":-0.58922541122967},{"t":3773,"x":55.29503781740228,"y":-0.12098797141323653,"rotation":-1.3761943709539128},{"t":3990,"x":56.56388504440886,"y":-1.29238092085832,"rotation":-0.7882243885401469},{"t":4208,"x":58.78905477714621,"y":-2.2844903923571365,"rotation":-0.0028362725312914144},{"t":4408,"x":62.48092976274001,"y":-2.2217186852118473,"rotation":0.8380412212390592},{"t":4608,"x":66.01277154616028,"y":-2.088551403103728,"rotation":2.2358860113344132},{"t":4808,"x":67.60666257028527,"y":-4.09962043874605,"rotation":4.389639434902007},{"t":5009,"x":69.18282223479704,"y":-4.545550267084359,"rotation":4.480728211632642},{"t":5209,"x":70.55990369618026,"y":-2.868438509133452,"rotation":2.3774738328635365},{"t":5410,"x":72.32518459985859,"y":-1.7449665512191908,"rotation":2.183281075595559},{"t":5610,"x":73.98915045943419,"y":-2.124163880376336,"rotation":3.991130076750078},{"t":5811,"x":76.61791631900978,"y":-1.6666912095334812,"rotation":5.798979077904594},{"t":6027,"x":78.80806167834666,"y":-2.218778875916503,"rotation":8.251670958927338},{"t":6244,"x":81.95438782589908,"y":-2.2551255479216916,"rotation":10.95116629005324},{"t":6445,"x":84.32356264490755,"y":-1.7674261884296625,"rotation":12.676582791562664},{"t":6646,"x":83.07884197178788,"y":-2.3202435085959388,"rotation":12.455125358267509},{"t":6846,"x":80.3161332375128,"y":-2.8586434129866887,"rotation":12.189906875279299},{"t":7047,"x":77.66683838072174,"y":-2.3832129326749176,"rotation":11.967123349569203},{"t":7247,"x":75.94003699503548,"y":-1.615216606237383,"rotation":10.860372791602888},{"t":7448,"x":75.75314786172369,"y":-1.6276965628208684,"rotation":10.309001080977252},{"t":7664,"x":76.31119122715458,"y":-1.4925108776481744,"rotation":11.09226686171144},{"t":7865,"x":76.8501954746404,"y":-1.6312513807520632,"rotation":11.821236121974833},{"t":8065,"x":77.84570914134721,"y":-1.6475651257207053,"rotation":13.07189913860741},{"t":8266,"x":79.40154871689205,"y":-1.5066048850347702,"rotation":14.290468952648022},{"t":8466,"x":80.93114485247513,"y":-1.7270099138797077,"rotation":15.87428403440168},{"t":8666,"x":83.24720506788705,"y":-1.6572660379723905,"rotation":18.402632802471558},{"t":8867,"x":84.50506928425999,"y":-4.0256898999989215,"rotation":20.170895838401464},{"t":9084,"x":84.97271203943944,"y":-7.243977329891536,"rotation":20.76758738563092},{"t":9284,"x":84.87029787818949,"y":-9.801260691745286,"rotation":22.342917213537035},{"t":9485,"x":84.1223546667471,"y":-11.235492206954689,"rotation":23.814330876090978},{"t":9685,"x":82.19974623999734,"y":-11.834692250307787,"rotation":25.417120758515807},{"t":9885,"x":78.79245598358641,"y":-11.346200057014162,"rotation":27.16004527546959},{"t":10085,"x":74.89457970991023,"y":-9.8705416299481,"rotation":28.745318328578307},{"t":10286,"x":71.84742770991025,"y":-7.412023202882038,"rotation":30.33059138168702},{"t":10487,"x":69.81835570991025,"y":-9.75960837599498,"rotation":31.85782987361416},{"t":10687,"x":69.20262770991027,"y":-12.210128375994978,"rotation":32.919369886991},{"t":10887,"x":69.42400370991027,"y":-15.460088375994976,"rotation":34.116274063147436},{"t":11105,"x":70.96025970991028,"y":-18.61404837599497,"rotation":35.541159987143196},{"t":11305,"x":73.58752370991027,"y":-20.455688375994967,"rotation":36.852055037219294},{"t":11505,"x":77.33478770991027,"y":-21.281648375994962,"rotation":38.16295008729539},{"t":11722,"x":81.40478770991024,"y":-21.087878375994958,"rotation":39.48096956699147},{"t":11923,"x":85.8487877099102,"y":-19.703648375994952,"rotation":40.920104350227184},{"t":12139,"x":89.54478770991017,"y":-17.620088375994946,"rotation":42.11700852638362},{"t":12340,"x":91.38087024382482,"y":-18.134552165885232,"rotation":43.21845992394508},{"t":12540,"x":93.49982820682662,"y":-19.5760071304669,"rotation":44.39308118547292},{"t":12740,"x":96.41240211984436,"y":-19.986456211569795,"rotation":45.447714253618884},{"t":12958,"x":100.44143046453839,"y":-19.464027708599946,"rotation":46.61602034707399},{"t":13158,"x":104.11543046453836,"y":-18.11095678970284,"rotation":47.67065341521995},{"t":13370,"x":108.24131779458259,"y":-15.390347895704297,"rotation":48.91872209384481},{"t":13570,"x":106.71314641747081,"y":-13.601529373912213,"rotation":46.65957727053409},{"t":13771,"x":106.88831145544252,"y":-11.77428236275267,"rotation":47.71400613450592},{"t":13971,"x":108.90961960378311,"y":-9.004728146012384,"rotation":49.563467672417275},{"t":14172,"x":109.12225604081108,"y":-6.551599856727373,"rotation":46.952480458107374},{"t":14372,"x":110.30251719866797,"y":-6.388452575567232,"rotation":48.06280690269217},{"t":14572,"x":111.88043158040692,"y":-6.4332320829548095,"rotation":49.4010153997505},{"t":14773,"x":113.7812309483401,"y":-6.447477380035605,"rotation":50.93844066664131},{"t":14973,"x":115.98034007721512,"y":-6.552226859791052,"rotation":53.06309004540327},{"t":15174,"x":118.75464259569237,"y":-6.788453500012198,"rotation":56.124219435316704},{"t":15374,"x":122.46069102056525,"y":-6.527197182708605,"rotation":59.64179516504153},{"t":15575,"x":126.5958487292597,"y":-6.682066732261177,"rotation":60.28100418799666},{"t":15775,"x":130.6448677576399,"y":-6.4976702900894585,"rotation":60.28867923105751},{"t":15975,"x":134.54014546866995,"y":-6.460845226203988,"rotation":61.4260455516925},{"t":16176,"x":138.52242248507977,"y":-6.362371261298112,"rotation":65.31070019331055},{"t":16376,"x":141.6074589720061,"y":-7.324555706904166,"rotation":66.2001590380052},{"t":16576,"x":145.83917330138772,"y":-7.160909557881228,"rotation":67.08076754593668},{"t":16777,"x":150.2391733013877,"y":-11.190869557881227,"rotation":67.11223260928233},{"t":16977,"x":154.63917330138767,"y":-14.020829557881223,"rotation":67.06440441349986},{"t":17178,"x":159.03917330138765,"y":-16.92758955788122,"rotation":67.01657621771739},{"t":17378,"x":163.41717330138763,"y":-19.269029557881215,"rotation":66.96898716291382},{"t":17578,"x":167.8391733013876,"y":-19.825109557881216,"rotation":66.92091982615244},{"t":17779,"x":172.2171733013876,"y":-18.722218188423714,"rotation":66.71782193499618},{"t":17979,"x":176.28717330138755,"y":-22.219198188423707,"rotation":65.8017888925262},{"t":18179,"x":180.68717330138753,"y":-24.845158188423703,"rotation":64.81148290066677},{"t":18380,"x":185.1091733013875,"y":-26.2749881884237,"rotation":63.81622537884804},{"t":18580,"x":189.50917330138748,"y":-26.494948188423695,"rotation":62.82591938698858},{"t":18781,"x":193.90917330138745,"y":-25.514908188423693,"rotation":61.83561339512912},{"t":18981,"x":198.33117330138742,"y":-23.32070818842369,"rotation":60.84035587331037},{"t":19182,"x":202.7311733013874,"y":-19.934668188423686,"rotation":59.850049881450914},{"t":19382,"x":206.77917330138737,"y":-22.38655582819826,"rotation":58.598507329222784},{"t":19582,"x":210.78317330138736,"y":-25.284285828198257,"rotation":57.231434822280505},{"t":19783,"x":215.16117330138735,"y":-27.315285828198256,"rotation":55.736668729524936},{"t":19983,"x":219.58317330138732,"y":-28.160205828198254,"rotation":54.2268798619678},{"t":20184,"x":223.9831733013873,"y":-27.79816582819825,"rotation":52.72460238181145},{"t":20384,"x":228.38317330138727,"y":-26.236125828198244,"rotation":51.2223249016551},{"t":20584,"x":232.80517330138724,"y":-23.45701582819824,"rotation":49.712536034097965},{"t":20785,"x":237.20517330138722,"y":-20.975213328198237,"rotation":48.210258553941614},{"t":20985,"x":241.6051733013872,"y":-24.814673328198236,"rotation":46.256789875324145},{"t":21185,"x":246.02717330138717,"y":-28.107270828198235,"rotation":44.29355385331359},{"t":21386,"x":250.42717330138714,"y":-31.46073082819823,"rotation":42.34008517469612},{"t":21587,"x":254.8491733013871,"y":-33.62169832819823,"rotation":40.376849152685566},{"t":21787,"x":258.8751733013872,"y":-34.53537082819821,"rotation":38.58942531175058},{"t":21987,"x":263.0551733013873,"y":-34.422555828198206,"rotation":36.73363006706399},{"t":22188,"x":267.4551733013874,"y":-33.1320158281982,"rotation":34.78016138844652},{"t":22388,"x":271.8072237612676,"y":-30.68219994116183,"rotation":32.99966764242302},{"t":22588,"x":273.50986118869235,"y":-33.15867175931489,"rotation":35.092405398078256},{"t":22789,"x":276.59432261611727,"y":-34.75194357746795,"rotation":37.18514315373349},{"t":22989,"x":280.85320994849866,"y":-35.106815395621005,"rotation":39.27788090938873},{"t":23189,"x":285.2752099484988,"y":-32.120793772864836,"rotation":41.38108235382224},{"t":23390,"x":289.6752099484989,"y":-27.708065591017895,"rotation":43.47382010947747},{"t":23590,"x":294.075209948499,"y":-26.39149550463743,"rotation":45.571591468609554},{"t":23791,"x":298.4532099484991,"y":-29.916458004637427,"rotation":47.67389927732436},{"t":23991,"x":302.85320994849917,"y":-32.26191800463742,"rotation":49.78677144688698},{"t":24191,"x":307.2752099484993,"y":-33.409845504637424,"rotation":51.91020797729742},{"t":24392,"x":311.6752099484994,"y":-34.472505504637425,"rotation":54.02308014686004},{"t":24592,"x":316.0752099484995,"y":-35.131965504637414,"rotation":56.13595231642266},{"t":24792,"x":320.4752099484996,"y":-34.59142550463741,"rotation":58.24882448598528},{"t":24993,"x":324.8752099484997,"y":-32.8508855046374,"rotation":60.3616966555479},{"t":25193,"x":329.27520994849976,"y":-29.91034550463739,"rotation":62.474568825110524},{"t":25394,"x":333.6972099484999,"y":-25.745843004637386,"rotation":64.59800535552097},{"t":25594,"x":335.6653577513013,"y":-26.109000987011473,"rotation":66.56227156845594},{"t":25794,"x":338.82516529585945,"y":-25.621362941122847,"rotation":68.38812564674319},{"t":25995,"x":342.2097215026842,"y":-25.598640686602007,"rotation":69.49174606670965},{"t":26195,"x":345.7553312107144,"y":-25.662559077573306,"rotation":71.2264937321983},{"t":26396,"x":349.1029599324207,"y":-26.24669166325295,"rotation":74.20708140311181},{"t":26596,"x":353.43357911284727,"y":-25.637133386004198,"rotation":77.17276613567076},{"t":26796,"x":356.99212378801326,"y":-26.384144426570536,"rotation":77.4745796055064},{"t":26997,"x":361.3690736876599,"y":-26.072921837597622,"rotation":77.4745796055064},{"t":27197,"x":365.4811221805341,"y":-25.0696005393242,"rotation":78.22301427231376},{"t":27397,"x":369.13265141256477,"y":-25.162394403695274,"rotation":82.37974466627519},{"t":27598,"x":373.207561022209,"y":-25.61830129236382,"rotation":83.76353739186949},{"t":27798,"x":377.6075610222091,"y":-27.336480932688968,"rotation":83.76353739186949},{"t":27999,"x":382.02956102220924,"y":-27.85399167121574,"rotation":83.76353739186949},{"t":28199,"x":386.37196102220935,"y":-27.166171311540893,"rotation":83.76353739186949},{"t":28400,"x":389.6932250222093,"y":-25.86314088064003,"rotation":83.76353739186949},{"t":28600,"x":391.6152730222093,"y":-29.79860088064003,"rotation":84.19765192441203},{"t":28800,"x":391.56181145629466,"y":-33.81520952441639,"rotation":84.67176057568788},{"t":29001,"x":390.8604817819714,"y":-37.36156952441639,"rotation":83.72457039063053},{"t":29201,"x":391.4885961756795,"y":-39.68752952441639,"rotation":82.78209259455357},{"t":29401,"x":393.4968065693876,"y":-40.8134895244164,"rotation":81.83961479847662},{"t":29602,"x":396.8839609630957,"y":-40.73944952441639,"rotation":80.89713700239966},{"t":29802,"x":401.24833356152277,"y":-39.46540952441639,"rotation":79.9546592063227},{"t":30003,"x":405.64833356152286,"y":-36.99136952441639,"rotation":79.01218141024574},{"t":30203,"x":404.8055432750257,"y":-37.78081137003494,"rotation":81.3564232196284},{"t":30403,"x":403.0835280246515,"y":-37.590681869212965,"rotation":84.16421911526479},{"t":30604,"x":401.88339869802536,"y":-36.99674192088688,"rotation":86.98605399037935},{"t":30804,"x":402.06218344765114,"y":-36.320612420064904,"rotation":89.79384988601574},{"t":31005,"x":403.6170022735288,"y":-34.45709336674704,"rotation":92.58760680217395},{"t":31205,"x":406.05289695943014,"y":-31.71171281419505,"rotation":94.56501414247663},{"t":31405,"x":406.27969218110684,"y":-31.761300765813964,"rotation":92.67454848686894},{"t":32190,"x":406.18404846264787,"y":-31.670890792129693,"rotation":92.67577262705466},{"t":32390,"x":404.9761764626479,"y":-30.61885079212969,"rotation":92.67577262705466},{"t":32591,"x":402.37208046264794,"y":-28.352290792129693,"rotation":92.67577262705466},{"t":32791,"x":398.44409646264796,"y":-24.914770792129687,"rotation":92.67577262705466},{"t":32992,"x":394.0220964626478,"y":-20.236210792129686,"rotation":92.67577262705466},{"t":33192,"x":389.62209646264773,"y":-14.37817079212968,"rotation":92.67577262705466},{"t":33393,"x":386.79484715725386,"y":-10.83781715307705,"rotation":92.67577262705466},{"t":33593,"x":385.12168908857456,"y":-10.643010595293621,"rotation":92.67801882188307},{"t":33794,"x":384.46626574160973,"y":-10.869404585503334,"rotation":91.9166619520386},{"t":33994,"x":383.69833953935944,"y":-11.044695324319582,"rotation":90.66135345417501},{"t":34194,"x":382.32389597340216,"y":-11.051920450601491,"rotation":89.10801733243092},{"t":34395,"x":380.481591322036,"y":-11.08703550116621,"rotation":87.36035884361614},{"t":34595,"x":378.06099438037273,"y":-11.238638842797833,"rotation":84.64734890069582},{"t":34795,"x":374.9659686100725,"y":-11.00696590458924,"rotation":82.94004092991979},{"t":34996,"x":371.71909382535637,"y":-13.295574337481968,"rotation":81.80539245438393},{"t":35196,"x":367.4016066774889,"y":-16.727034337481964,"rotation":81.48000043898753},{"t":35397,"x":363.00160667748884,"y":-18.958494337481962,"rotation":81.15460842359113},{"t":35597,"x":358.5796066774887,"y":-19.99185183748196,"rotation":80.82758944811775},{"t":35798,"x":354.1796066774886,"y":-19.817311837481952,"rotation":80.50219743272135},{"t":35998,"x":349.7796066774885,"y":-18.44277183748195,"rotation":80.17680541732494},{"t":36198,"x":345.3796066774884,"y":-15.868231837481948,"rotation":79.85141340192854},{"t":36399,"x":340.9576066774883,"y":-12.071559337481942,"rotation":79.52439442645516},{"t":36599,"x":337.3184663212511,"y":-11.140098867934352,"rotation":79.16353501907187},{"t":36800,"x":334.00063762456205,"y":-10.887630049055682,"rotation":78.17122874104716},{"t":37000,"x":333.48743832602486,"y":-11.42406169288269,"rotation":75.56237520345367},{"t":37200,"x":334.28971147330253,"y":-10.882088762437393,"rotation":73.41079939498422},{"t":37401,"x":335.0199882238848,"y":-10.833421739824702,"rotation":74.31503407952466},{"t":37601,"x":334.66205039857505,"y":-10.759366656342822,"rotation":73.73523179099124},{"t":37801,"x":333.69146567947877,"y":-12.224253213652053,"rotation":72.91304059320767},{"t":38002,"x":331.33195543812343,"y":-12.812796097924215,"rotation":72.08326512623194},{"t":38202,"x":328.15791348652584,"y":-12.195654490234823,"rotation":71.2576178954103},{"t":38402,"x":328.07096936759564,"y":-11.290453404090043,"rotation":70.52614915938095},{"t":38603,"x":328.3556579889986,"y":-10.848627217143173,"rotation":70.94096872344545},{"t":38803,"x":328.2157395677057,"y":-10.453037584898514,"rotation":70.68118804963709},{"t":39004,"x":328.21582285019235,"y":-10.288186424739203,"rotation":70.68149812423006},{"t":39204,"x":328.2158228860615,"y":-10.813140889320621,"rotation":70.68150928937024},{"t":39505,"x":328.2180603209101,"y":-10.942063952700256,"rotation":70.68446711772594},{"t":39705,"x":328.2180623648879,"y":-11.486215399809286,"rotation":70.68446711772594},{"t":39906,"x":328.2180623648876,"y":-12.224866534493724,"rotation":70.68446711772594},{"t":40106,"x":328.2180623648876,"y":-13.117203506216041,"rotation":70.68446711772594},{"t":40306,"x":328.2180623648876,"y":-14.090407840652716,"rotation":70.68446711772594},{"t":40506,"x":328.2180623648876,"y":-15.09886732407428,"rotation":70.68446711772594},{"t":40707,"x":328.2180623648876,"y":-16.112172111765283,"rotation":70.68446711772594},{"t":40907,"x":328.2180623648876,"y":-17.127004188781104,"rotation":70.68446711772594},{"t":41108,"x":328.2180623648876,"y":-18.147004188781114,"rotation":70.68446711772594},{"t":41308,"x":328.2180623648876,"y":-19.16687705701316,"rotation":70.68446711772594},{"t":41509,"x":328.2180623648876,"y":-20.184554270744666,"rotation":70.68446711772594},{"t":41709,"x":328.22671482710126,"y":-21.189940906814087,"rotation":70.68517085109883},{"t":41910,"x":328.3913782872852,"y":-22.170861336470058,"rotation":70.72363451671899},{"t":42110,"x":328.6480090469919,"y":-23.1520883240319,"rotation":71.03434515740311},{"t":42310,"x":329.36139649593633,"y":-25.15291316543238,"rotation":71.33906085777787},{"t":42510,"x":331.4641844059754,"y":-26.281498615594526,"rotation":71.65234906110176},{"t":42711,"x":334.93978184880046,"y":-26.20171279486034,"rotation":71.96407861664791},{"t":42911,"x":338.5702563437826,"y":-25.771017666987305,"rotation":72.96779105677055},{"t":43112,"x":341.42560365414784,"y":-26.237413771614072,"rotation":75.5220857306135},{"t":43312,"x":345.49056521013705,"y":-25.614986645466246,"rotation":77.94790799031813},{"t":43513,"x":349.2826530756515,"y":-25.6255457513591,"rotation":79.09386933571733},{"t":43713,"x":353.05639775993444,"y":-25.8155824089085,"rotation":81.07310795198912},{"t":43913,"x":356.84538239136924,"y":-26.13266054578589,"rotation":83.86280156139058},{"t":44114,"x":360.9449021949329,"y":-25.694491689270514,"rotation":86.93809820687146},{"t":44314,"x":363.79711611653505,"y":-26.84937041865906,"rotation":90.68728069843114},{"t":44515,"x":367.9312113406723,"y":-26.804249148047603,"rotation":94.43646318999082},{"t":44715,"x":372.35321134067243,"y":-25.549642471083093,"rotation":98.2043915940083},{"t":44915,"x":376.0332282537379,"y":-25.544994331515177,"rotation":99.45411528726731},{"t":45116,"x":380.30191742619365,"y":-25.47838407530262,"rotation":99.45411528726731},{"t":45316,"x":384.06820960127567,"y":-25.218760818100705,"rotation":99.57384781396478},{"t":45516,"x":386.6955909031873,"y":-25.012592254589208,"rotation":99.57384781396478},{"t":45717,"x":387.47553870307945,"y":-25.716921623108526,"rotation":100.98901567504103},{"t":45917,"x":387.8182156968186,"y":-29.644881623108525,"rotation":100.61377514368698},{"t":46118,"x":388.1706846905577,"y":-32.37284162310852,"rotation":100.23853461233293},{"t":46318,"x":389.3796227671385,"y":-34.884767460289105,"rotation":99.7087843895275},{"t":46518,"x":391.453481817524,"y":-33.59485110642003,"rotation":98.48103927310743},{"t":46719,"x":393.5475511231614,"y":-33.54523644932775,"rotation":97.12607759707275},{"t":46919,"x":393.94299337135556,"y":-36.09179586972255,"rotation":98.3248233843556},{"t":47119,"x":393.3086234855417,"y":-36.774122863328536,"rotation":101.4513586256675},{"t":47320,"x":392.6710817502988,"y":-36.250601691902546,"rotation":104.59352654318596},{"t":47520,"x":392.5643278644849,"y":-34.52692868550853,"rotation":107.72006178449786},{"t":47721,"x":393.20032212924195,"y":-32.93911012516953,"rotation":110.86222970201632},{"t":47921,"x":393.8331522434281,"y":-36.77257012516953,"rotation":113.48418273000985},{"t":48121,"x":394.4659823576143,"y":-39.40603012516952,"rotation":116.10613575800338},{"t":48322,"x":395.10197662237135,"y":-40.84339762516952,"rotation":118.74119855113688},{"t":48522,"x":396.48360673655736,"y":-41.07085762516952,"rotation":121.3631515791304},{"t":48723,"x":399.2464848507434,"y":-40.09831762516952,"rotation":123.98510460712393},{"t":48923,"x":403.34422502724817,"y":-37.91165512516952,"rotation":126.62016740025743},{"t":49123,"x":406.1965786587894,"y":-39.30898126942508,"rotation":128.65553166140103},{"t":49324,"x":405.900709993212,"y":-41.90224806032467,"rotation":129.66834203099984},{"t":49524,"x":405.7312148184312,"y":-43.09743215355671,"rotation":130.77473828535798},{"t":49725,"x":406.2543360375546,"y":-43.083913639359736,"rotation":131.87563008073923},{"t":49925,"x":406.1239648958468,"y":-42.78095143758677,"rotation":131.3988100344692},{"t":50126,"x":406.2603238496057,"y":-43.306482762184096,"rotation":131.86022145554705},{"t":50509,"x":406.18370201876587,"y":-43.184303414809406,"rotation":131.6473937027321},{"t":50710,"x":406.15532705428404,"y":-42.565848149160026,"rotation":130.7375585236214},{"t":50910,"x":405.8752812045277,"y":-41.55135201955592,"rotation":129.62719636468017},{"t":51111,"x":405.30023050780414,"y":-39.574496070632804,"rotation":128.62225301608052},{"t":51311,"x":404.76027770856035,"y":-37.21189111586756,"rotation":127.6273091037853},{"t":51511,"x":405.16843996057656,"y":-41.139851115867565,"rotation":125.97869865539103},{"t":51712,"x":406.1824854804014,"y":-43.565793825705875,"rotation":125.9919439972159},{"t":51912,"x":407.33917817772857,"y":-44.306055116725915,"rotation":128.69351841348114},{"t":52113,"x":409.8869108750558,"y":-43.83428640774596,"rotation":131.39509282974632},{"t":52313,"x":413.7915983763311,"y":-42.16210838886043,"rotation":134.08322657727388},{"t":52513,"x":418.19159837633117,"y":-38.8891303699749,"rotation":136.77136032480144},{"t":52714,"x":422.6135983763313,"y":-34.310931660994946,"rotation":139.4729347410666},{"t":52914,"x":426.37769437633125,"y":-28.5527536421094,"rotation":142.16106848859417}]');
		//this._record = this._record.reverse();

	};

	ChuClone.components.player.PlayerPlaybackComponent.prototype = {
        /**
         * @type {String}
         */
		displayName						: "PlayerPlaybackComponent",					// Unique string name for this Trait

        /**
         * @type {ChuClone.GameEntity}
         */
        _player					: null,

		/**
		 * Must have a valid method 'getCurrentTime'
		 * @type {Object}
		 */
		_clockDelegate			: null,

		/**
		 * @type {Array}
		 */
		_record	    : null,

		/**
		 * Bitmask of the current keyboard state
		 * @type {Number}
		 */
		_currentState: 0,

		/**
		 * @inheritDoc
		 */
		attach: function(anEntity) {
			//anEntity.removeAllComponents();
			ChuClone.components.player.PlayerPlaybackComponent.superclass.attach.call(this, anEntity);
			this.attachedEntity.getBody().SetType( Box2D.Dynamics.b2Body.b2_staticBody );
		},

        execute: function() {
            ChuClone.components.player.PlayerPlaybackComponent.superclass.execute.call(this);
			if( !this._clockDelegate ) {
				console.error("Cannot attach PlayerPlaybackComponent without valid clock delegate");
				return;
			}
        },

		/**
		 * Overrides the keyboardComponents state
		 */
		update: function() {
			var time = this._clockDelegate.getCurrentTime();
			//time += 4;
			var len = this._record.length;
			var needsUpdate = false;
			var i = 0;
			this.lastI = 0;
			while( i < len) {
				var stateInfo = this._record[i];

				// Match found - set our state and pop the element
				if(stateInfo.t >= time) {
					this._currentState = stateInfo;
					//this._record.shift();
					needsUpdate = true;
					this.lastI = i+1;
					break;
				}
				i++;
			}

			//console.log(this._record[0].t)
			//console.log( time - this._currentState.t );

			/*
			/**
				 * More info: http://www.learningiphone.com/2010/09/consicely-animate-an-object-along-a-path-sensitive-to-time/
				 * Find T in the time value between the points:
				 *
				 * durationBetweenPoints: Amount of time between the timestamp in both points
				 * offset: Figure out what our time would be if we pretended the previousBeforeTime.time was 0.00 by subtracting it from us
				 * t: Now that we have a zero based offsetTime, and a maximum time that is also zero based (durationBetweenPoints)
				 * we can easily figure out what offsetTime / duration.
				 *
				 * Example values: timeValue = 5.0f, nextPointTime = 10.0f, lastPointTime = 4.0f
				 * result:
				 * duration = 6.0f
				 * offsetTime = 1.0f
				 * t = 0.16
				 */
				if( this.lastI > len-1 ) return;
				var durationBetweenPoints = (this._record[this.lastI].t - this._currentState.t);
					var offsetTime =  this._currentState.t - time;

				// T is where we fall between, as a function of these two points
				var t = offsetTime / durationBetweenPoints;
				//if(t > 1.0)  t = 1.0;
				//else if(t < 0) t = 0.0;

			//console.log(t)
			//
			var alpha = t;
			  //console.log(alpha)
			// Found an update state
			if( this._currentState ) {
				var dt = time - this._currentState.t;
				//var alpha = dt / ChuClone.model.Constants.PLAYER.RECORDING_INTERVAL;
				//alpha = Math.min( alpha , 1) ;
				var bodyPos = this.attachedEntity.getBody().GetPosition();
				var view = this.attachedEntity.getView();
				var body = this.attachedEntity.getBody();

				//var alpha = 0.5;
				//State state = currentState*alpha + previousState * ( 1.0 - alpha );
                var oneMinusRatio = 1.0 - alpha;
				// New state
                var x = this._currentState.x;
                var y = this._currentState.y;
				var r = this._currentState.rotation % Math.PI;

				//acceleration.x * kFilteringFactor + accelerationX * (1.0 - kFilteringFactor);
				var newX = (bodyPos.x * alpha) +  x * oneMinusRatio;
                var newY = (bodyPos.y * alpha) + y * oneMinusRatio;
                var newRotation = (-body.GetAngle()  * 0.4) + r * 0.6;
				//console.log(newRotation)
				body.SetPositionAndAngle( new Box2D.Common.Math.b2Vec2(newX, newY), newRotation );

				//this._antiGravity = new b2Vec2(0, this.body.GetMass() * aGravityForce );
				//this._tracer.ApplyForce( this._antiGravity, this._tracer.GetWorldCenter() );
			}
		},

        /**
         * Restore material and restitution
         */
        detach: function() {
           ChuClone.components.player.PlayerPlaybackComponent.superclass.detach.call(this);
        },

		/**
		 * Sets the object we call getClock on, probably the playlevelstate
		 * @param {ChuClone.states.PlayLevelState} aDelegate
		 */
		setClockDelegate: function( aDelegate ) {
		   if( typeof aDelegate.getCurrentTime === 'function' ) {
			   this._clockDelegate = aDelegate;
		   }
		},

		/**
		 * @return {Array}
		 */
		getRecord: function() { return this._record }
	};

    ChuClone.extend( ChuClone.components.player.PlayerPlaybackComponent, ChuClone.components.BaseComponent );
})();