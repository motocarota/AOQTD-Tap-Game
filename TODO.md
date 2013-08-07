# [ AOQTD Tap Game ] (http://www.simone-poggi.com/)

L'obiettivo e' creare un gioco tipo archmage defense in cui il giocatore e' attaccato da orde di nemici 
piu' o meno forti che avanzano verso di lui, su cui si sparano incantesimi per difendersi

## TODO

Fare tutti i livelli
Fare tutti i mostri
cercare di capire come potrei implementare intelligenza artificiale dei mostri

( GRAPHICS )

	* Sprite dell'albero danneggiato in 3-4 fasi
	* mostri
	* livelli
		Cava del drago
		Torre del mago
		Piano astrale
	* gold / banner
	* Suoni / Musica
	* animazione iniziale
		sd2 che spiega il suo piano e viene deriso

( CODE )

	* filmatino introduttivo
	* provare i nemici intelligenti/ranged
	* classi di mostro (humanoid, undead, beast, construct)
		hanno effetto sui dv, danni
	* implementare il boss fight
		comportamenti scriptati, con strategia da ripetere tre volte, stile vecchi giochi	

( DOPO )

	* documentare il codice
	* rifare main.js per rispecchiare lo schema di sumon
	* html5 games prime, leggere ( http://buildnewgames.com/mobile-game-primer/ )


## LISTA MOSTRI

da implementare
					stand	walk	att
---------------------------------------
Goblin
zombie
scheletro
ghoul
mummia
vampiro
rakshaaza
hill giant
golem
dragon argilla
giant turtle
beholder
blink dog
shadow
minotauro
luci fatue

## LISTA LIVELLI
							bg			music
----
	* Campagna				ok
	* Deserto				ok
	* Neve					ok
	* (arancione)			
	* Torre del mago		
	* Vulcano				
	* Piano Astrale			

## BOSS	

Per il momento i boss saranno dei semplici npc con un sacco di vita (tipo 100+hp) e una ai un po' particolare
POI se avro' voglia li implementero' diversamente
qui ci vorrebbe qualcosa di notoriamente avido
tipo un folletto o un genovese
una figura vecchia e avara tipo pdp

	* Tre Avventurieri : Avarizia ( verde )
		scarsa disponibilità a spendere e a donare ciò che si possiede, cieca sete di ricchezza
		- Campagna, colline e pianure irlandesi

	* Vermone gigante : Gola ( giallo )
		abbandono ed esagerazione nei piaceri della tavola
		- Deserto

	* Ogre : Accidia ( arancione )
		torpore malinconico, inerzia nel vivere e nel compiere opere di bene
		- tramonto

	* Ninfa Druida : Lussuria ( azzurro )
		desiderio irrefrenabile del piacere sessuale fine a sé stesso
		- Neve	

	* Drago (fuoco) : Ira ( rosso )
		irrefrenabile desiderio di vendicare violentemente un torto subito
		- Tana del drago / Vulcano in eruzione, magma e roccia bruciata

	* Golem di Argilla : Superbia ( blu )
		desiderio irrefrenabile di essere superiori, fino al disprezzo di ordini, leggi, rispetto altrui
		- Torre del mago / Librerie, corridoi, terrazza

	* Demi-Lich : Invidia ( viola )
		tristezza per il bene altrui, percepito come male proprio
		- Piano Astrale / tutto assurdo e fuori dal tempo
		- Cimitero di notte


		

## BUGS

* impostare lo z-index dei nemici = director.height - y
* alcuni nemici sembrano in grado di attaccare anche da subito
* alcuni nemici camminano in eterno
* su android non mi mostra il font custom