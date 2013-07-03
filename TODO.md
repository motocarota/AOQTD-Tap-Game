# [AOQTD Tap Game](http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo tower defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

Ogni nemico ucciso da punti esperienza, e ha una percentuale di lasciar cadere oggetti utili
	pozioni
	pergamene
	monete

Domanda:

Come implemento i duelli di magia?

Li implementiamo come boss non necessariamente maghi:

Si passa dal bruto che rigenera


----

(1) Spell - come funzionano:

Normalmente si lancia a brettio il dardo incantato: basso costo ( tipo quello attuale : )
Poi quando si ricevono incantesimi extra e si caricano in memoria, si ha una serie di pulsanti in basso
click sullo spell scelto -> si lancia l'incantesimo, poi lo spell torna ad essere il dardo incantato

tutti gli spell di alto livello hanno una sorta di cooldown 


## TODO

* fare UI con:
 	- cooldown visivi
	- icone per gli incantesimi
	- xp / livello
	- pause/end game
* setup di un db locale che memorizzi i livelli completati (con punteggio)
	es. var playerStatus = {
		xp: 	1000,
		level: 	3,
		score: [ 3, 2, 3, 1 ] // i livelli successivi non completati NON hanno punteggio
	};
	
* capire perche' gli eventi touch non vengono presi (bg e pulsanti)
	vedere se CAAT.TOUCH_AS_MOUSE c'entra qualcosa
* fare disegni e note per i livelli ed i mostri da dare poi a meky e alla Cla

* studiare bene una UI
	pausa px mo hp mp spells e BANNER :D

( SPELL )
	* implementare logica spell descritta sopra(1)
	* [ later: fare in modo di applicare gli effetti anche tramite travel, se sono definiti]
	* creare incantesimi (lista, implementazione, sprites)
	
( ENEMIES )
	* creare mostri (implementazione, sprites)
	* Tabelle dei nemici da generare
		- Timer che genera i nemici in base al livello di gioco
			a fine ciclo crea il boss
		- script / json ce determini cosa succede nella scena:
			es. spawn di N nemici di tipo X
		
	* pensare a come implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi
* Suoni
* Musica

## DOPO

* Versionare il codice
* Documentare il codice
* Riogranizzare il codice in modo da avere la seguente gerarchia
	Actor
		Entity
			Player
			Enemy 	( moveable, damageable )
			Spell 	( moveable )
			Drop 	( active )
	
* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )

## LISTA SCENE

* welcome 	[ levels, options ]
* options 	[ welcome ]
* levels 	[ game, welcome ]
* game 		[ pause, levels ]
* pause 	[ game, levels ]

## LISTA OGGETTI

* monete
* pozioni
* pergamene
* bacchette
* gold (cosa ci si compra?)

## LISTA INCANTESIMI

Livello 1
	* Dardo incantato
	* Sonno
	* Paura

Livello 2
	* Raggio infuocato
	* Unto
	* Freccia Acida

Livello 3
	* Palla di Fuoco
	* Confusione
	* Evoca mostri

Livello 4
	* Muro di pietra
	* Tempesta di ghiaccio
	* Velocita'

Livello 5
	* Dito della morte
	* Dominare Mostri
	* Catena di Fulmini

## LISTA MOSTRI

* Coboldo
* Goblin
* Scheletro
* Orco
* Zombie
* Mummia
	
##	Bestiario

						stand	walk	attack		damage		die
	Kobold
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
