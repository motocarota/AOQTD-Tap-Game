# [ AOQTD Tap Game ](http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO

CAPIRE perche' non mi aumenta il gold
RIFARE i cazzo di pulsanti degli incantesimi

( GRAPHICS )

	* mostri, spell, livelli
	* UI e menu +fonts

( GAME )

	* rivedere il game over, sia win che die
		mostrare statistiche 
			numero di nemici uccisi
			salute dell'albero
			soldi presi
			xp guadagnati

( UI )

	* rifare l'immagine dei pulsanti in modo da posizionarli correttamente
	* trovare / farsi un font custom
	* cooldown / xp / livello / px / gold / Banner
	* Suoni 
	* Musica

( SPELL )

	* fare in modo di applicare gli effetti anche tramite travel, se sono definiti
	* creare incantesimi (lista, implementazione, sprites)

( ENEMIES )

	* classi di mostro (undead, beast, construct)
	* pensare a come implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi

( DOPO )

* animazione iniziale?
* Documentare il codice
* rifare completamente il main.js per rispecchiare lo schema di sumon
* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )
* Timer che genera i nemici in base al livello di gioco
		wave = [
			{ time: null, n:2,  type:[ 'fey' ] }, 				// dopo random sec evoca 2 fey
			{ time:  120, n:12, type:[ 'kobold', 'duck' ] }, 	// dopo 120 sec evoca 12 nemici tra koboldi e duck
			{ time:  240, n:1,  type:[ 'dragon' ] }				// dopo 240 sec evoca un drago
		];



## LISTA SCENE

main 		[ info, help, levels ]
info, help	[ main ]
levels 		[ game(lev), main ]
game 		[ main, levels, endgame ]
endgame		[ list ]

## LISTA OGGETTI

* monete
* pozioni
* pergamene
* bacchette
* gold


## INCANTESIMI

Come funzionano:
	Con un tap si lancia il dardo incantato: basso costo, no cooldown
	Poi quando si ricevono incantesimi nuovi si ha una serie di pulsanti in basso
	Select spell -> cast spell -> [ se ha cd ] autoselect dardo incantato

Livello 1
	* Dardo incantato	1d6 no cd
	* Sonno
	* Unto

Livello 2
	* Raggio infuocato	4d6 cd medio-breve
	* Freccia Acida		6d4 dot, cd breve
	* 

Livello 3
	* Palla di Fuoco	10d6 cd medio 
	* Confusione		
	* Fulmine			10d6 cd medio

Livello 4
	* Muro di pietra
	* Tempesta di ghiaccio
	* Velocita'

Livello 5
	* Dito della morte
	* Dominare Mostri
	* Catena di Fulmini

## LISTA MOSTRI

con implementazione
						stand	walk	att		stun	data
----------------------------------------------------------------livello 1						
Kobold				ok		ok		ok				ok
Goblin
Orco
Troll

zombie
scheletro
ghoul
mummia
vampiro

cubo gelatinoso
rakshaaza
hill giant
golem
dragon
giant turtle
beholder
blink dog
shadow
minotauro
luci fatue

## LISTA LIVELLI
							bg			music
----
	* Campagna
	* Locanda / Arena
	* Bosco Fatato
	* Cava del Drago
	* Torre del mago
	* Vulcano
	* Piano Astrale

## BOSS	

	* Demi-Lich : Invidia ( blu )
		tristezza per il bene altrui, percepito come male proprio
		- Piano Astrale / tutto assurdo e fuori dal tempo

	* Drago (fuoco) : Ira ( rosso )
		irrefrenabile desiderio di vendicare violentemente un torto subito
		- Tana del drago / Vulcano in eruzione, magma e roccia bruciata

	* Golem di Ferro : Superbia ( viola )
		desiderio irrefrenabile di essere superiori, fino al disprezzo di ordini, leggi, rispetto altrui
		- Torre del mago / Librerie, corridoi, terrazza

	* Ninfa Druida : Lussuria ( azzurro )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- Bosco fatato / Fitta vegetazione, sberluccichi luminosi strani, rovine tipo greche
		Strategia: legarsi, quindi quando sta per fare il canto ammaliatore, bisogna rallentarsi facendo unto/ragnatela

	* Rospo / Vermone gigante : Gola ( arancione )
		meglio conosciuta come ingordigia, abbandono ed esagerazione nei piaceri della tavola
		- Deserto
		Strategia: scappare dal mostro per 3 minuti, la cui fame cresce man mano (jetpack joyride)

	* Avventurieri : Avarizia ( giallo )
		scarsa disponibilità a spendere e a donare ciò che si possiede, cieca sete di ricchezza
		- Citta' / strade, locanda, arena

	* Ogre : Accidia ( verde )
		torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- Greenhill / Campagna, colline e pianure irlandesi
		

## BUGS

* impostare lo z-index dei nemici = director.height - y
