# Description

Cyberiada is an idle cyberpunk-themed RPG inspired by Bitburner. In this game player control crew of up to 10 members by giving them various orders to perform. Crew can travel between different cities which have different conditions and unique rewards.

# Terms

## Money

Money is a resource which can be spend on performing various actions such as completing searches faster, hiring new crew members, buying equipment, boosters and augmentations etc. Later in a game can be converted to credibility.

## Credibility

Credibility is a main resource in the game. It show how much progress is done in particaluar city. Unlocking equipment, boosters, augmentations, works, contracts, missions etc. requires reaching certain levels of credibility.

## Wanted level

Wanted level is modifier to all requirements, experience and credibility gains. It allows higher rewards at cost of making actions harder to perform. 

Unavailable in beginning, can be unlocked in specific city.

## Difficulty level

Each city has it's own difficulty level. Higher difficulty levels leads to higher requirements but also to higher credibility and experience gains. Difficulty level increases after reaching certain credibility thresholds and then relocating. Most cities have upper limit on difficulty level.

## Qualities

Various objects have different quality. Currently available qualities:
- Common
- Uncommon
- Rare
- Superb
- Awesome
- Excellent
- Perfect

## Crew

Game revolves around managing crew. Crew members is managed by giving them orders. Various orders have different priorities.

Moving to another city will result in losing current crew but certain favors allow to retain crew members.

If all crew members are lost, crew will restart in starting city but previously unlocked features will remain unlocked.

## Crew member

Each crew member has their own set of attributes, skills, equipment and augmentations. They can be boosted by boosters. Certain actions can kill them. To hire new crew members, special actions should be perform to find and hire new one with money. Depending on quality, crew members have different starting equipment, augmentations, attributes and skills. Attributes and skills cannot be above difficulty level.

## Stats

### Level

Each crew member has their own level. Level requirements do no depend on current city or difficulty level and are exponential. Reacing new level gives crew member one attribute and one skill points.

### Experience

To get new levels, crew members must reach certain thresholds of experience. Experience gain can be increased by increasing intellect and using certain items.

### HP

HP indicates how much damage can crew member take. If HP reaches 0 or lower, crew member dies, to be removed from crew and all actions related to him are cancelled. Can be increased by certain items and endurance.

If crew member is not engaged in combat or hacking order, they can be healed for some amount of money.

### Damage

Damage is used in combat. Each time someone receives a hit, damage is selected from certain range, reduced by opponent defense and then applied. Damage depends on equipment.

### Critical rate

Each time damage is dealt, it may deal critical hit. Critical rate indicates how often these critical hits happen. Critical rate bonuses depend on equipped weapon, attributes and skills.

### Critical multiplier

Whenever critical hit happens, damage is multiplied by critical multiplier. Multiplier depends on equipment.

### Defense

This parameter reduces all incoming damage. Depends on equipment.

### Hit number

This parameter affects how many attacks will be dealt per turn. Can be increased by agility.

### Precision.

This parameter affects how it's likely to make a hit. It depends on equipment, attributes and skills.

### Dodge

This parameter affects how it's likely to dodge the attack. Can be increased by stealth and agility.

### Regeneration

This parameters affects how fast crew member HP will regenerate.

## Attributes

### Strength

Strength is used mostly in weapon requirements and for critical rate bonuses for melee weapons.

### Endurance

Endurance affects crew member HP and how fast augmentations can be installed in them.

### Perception

Perception is used in determining whether opponent is hit or not. It's another usage is for critical rate bonuses.

### Agility

Agility is used for dodging attacks and increasing hits number in combat.

### Intellect

Intellect affects how much experience crew member gets after completing orders. It also used in weapon requirements, for decreasing search requirements.

### Charisma

Charisma gives bonuses related to money and credibility.

## Skills

### Close combat

Close combat affects critical rate for close combat weapons such as knifes and SMGs.

### Ranged combat

Ranged combat affects critical rate for ranged combat weapons such as assault and sniper rifles.

### Stealth

Stealth is used for dodging attacks.

### Hacking

Hacking is used for hacking and using smart weapons such as mechs and combat drones.

### Crafting

Crafting is used for crafting and using complex equipment such as power armor and mechs.

### Persuasion

Persuasion gives additional money and credibility bonuses.

### Info gathering

Info gathering affects searches times.

## Equipment

Each crew member has three different equipment slots: weapon, armor and utility. Weapon equipment deals damage, armor provides defense and utility gives buffs. Each equipment item has level and quality. Higher the level or quality, higher the requirements and stats. Changing equipment is not free - it results in short action which will override current member action and cannot be cancellable. Equipment can be bought from weapon shop, be crafted or earned by performing missions and contracts. Some equipments are faction-specific and require crafting or capturing weapon shop district for faction.

Equipment will be lost after moving to another city unless specific favors are earned.

Unlocked in starting town at some point.

## Augmentations

Augmentations are another way to buff crew members. Like equipment, each augmentation has level and quality, which affect requirements and stats. Augmentation is not free, each augmentation has time wall to install which can be reduced by endurance. Augmentations are installed in hospitals.

Each crew member has following augmentations slots:
- Skin
- Nerve system
- Eyes
- Head
- Torso
- Arms
- Legs

Augmentations are not affected by moving to another city.

Unlocked in starting town at some point.

## Boosters

Boosters give buffs and debuffs for limited amount of time. Must be applied manually, application results in short uncancellable action. Each booster has level and quality affecting it's stats.

Unlocked in starting town at some point.

## Inventory

Inventory has equipment and boosters which can be sold for money. Inventory space is limited. After relocating inventory will be emptied.

## Crafting blueprints

Crafting blueprints allows crafting equipment or boosters. Level of resulting item is limited by level of crafting. Quality can be selected and will affect crafting time, but crafting level can decrease it. Getting blueprints for same item increases max quality with what item can be crafted.

Crafting rectipes are unlocked in specific city by repeated runs.

## City

Each city is described as square map of 100x100 cells. City is divided into districts. Each district may have it's own one main facility: weapon shop, pharmacy, hospital, faction HQ, player HQ or training facility. In addition, each district has it's own multipliers to requirements and gain multipliers.

Each city has it's own line of rewards, each reward requires increasing amount of credibility. These rewards are **not** reset after revisiting city with few exceptions. Achieving higher credibility will increase difficulty level of the city after relocating. Player can achieve multiple rewards in same run.

Each city district has it's own set of order counters.

## Facilities

Arms shop, pharmacy, hostpitals and training facilities have quality. Shops can sell items limited by quality. Training facilities can increase skill or attribute to level depending on difficulty level and quality. Quality can be increased by working for them.

Training facilities can increase only one selected attribute or skill.

## Factions

Each city has it's own set factions that try to claim city for themself. Player can join one faction if credibility requirements are met. Once faction is joined, player cannot leave it unless they relocate.

Each faction HQ has physical and virtual bank accounts so they can be robbed in specific missions.

Faction specific equipment, boosters and augmentations can be achieved by doing certain actions or by participating in turf war.

Player can control faction HQ by performing certain missions, allowing moving money from their accounts.

Faction district type is locked.

## Turf war

Turf war allows factions capture districts depending on faction power level. Depending on what has been captured, faction will receive different bonuses:

- Capturing arms shops, pharmacies and hospitals unlock faction specific items in these facilities
- Capturing training facilities will give substantial discount for faction members
- Capturing opposing faction HQ will prevent it from capturing additional districts
- Capturing player HQ will prevent player crew from operating in different districts

Capturing districts allows crew to perform activities here.

Requirements to capture will increase with each owned distict. Player can assist their selected faction by increase it's power level or decrease power levels of it's opponents by performing certain orders.

Player can use district facility if only if they didn't select faction, district is neutral or under the same faction as player. Player can perform actions only in their faction disticts or in district with player HQ. Player can perform action in district with player HQ no matter who captured it.

By default, turf war is disabled and, if earned, can be toggled upon the start. Initially, all districts with factions HQs are belong to their factions, other districts are neutral.

## Retaliations

Performing certain actions will trigger retaliations. Amount of retaliations that are about to happen is limited. Retaliations can have different quality, requiring different stats to locate it. Before retaliation happens, certain large amount of time should pass, allowing player to find it. After retaliation is found out, a mission can be assigned to deal with it.

By default, retaliations are disabled and, if earned, can be toggled upon the start.

### Hunting party

Hunting party will kill one of player crew member.

### Raid

Raid will reduce player money and some items from inventory will be lost.

### Defamation

Defamation will reduce player credibility.

### Assault

Assault will target player faction and reduce it's power level.

### Hacking

Hacking will affect player server and programs.

### Slander

Slander will reduce amount of orders available in all districts.

## Relocation

Relocation is the prestige. After relocating, almost everything but one crew member will be lost. Certain favors allow to keep money, credibility, crew members and their equipment at a price or by earning credibility rewards repeatedly. As player achieves higher credibility in the city, difficulty level after relocating will be increased.

Relocation losses can be mitigated by getting favors, either by buying, performing missions or achieving already reach levels of credibility.

Relocation favors include
- Retaining money after relocations (10 tiers, each tier retain 10% more)
- Keep weapons
- Keep armors
- Keep utility item
- Keep additional crew members (9 tiers, each tier allow to keep 1 more)

Augmentations and blueprints are not affected by relocation.

## Orders

All orders that require searches, can have their searches paid. It allows to finish it instantly. Additionally, each minute each district can receive new orders to perform.

If order has hacking or combat, it is time limited instead of time walled.

Crew member can be assigned two types of orders: completable orders are will yield result after finishing them and side jobs will yield as member works on it. Completable orders will be finished first, if there is no completables, crew member will work on their side job. Only one side job and one completable is available for each crew member. Assigning new side job/completable will result in cancelling previous one.

Side jobs, contracts and missions are capped for each district, type and quality. Amount of actions available depends on type.

### Crew member searches

Crew member searches are independent from district. It generates an paid offer after finishing it. Each new hire may have it's own set of equipment and augmentations, which are included in hire price. Search can be finished 

Quality increases search time, price, equipment and augmentations qualities, attributes and skills points. New crew member hire attributes and skill points are limited by difficulty level. Equipment and augmentations qualities are limited by search quality.

### Side jobs

Side jobs are basic orders. Each district has it's own set of counters for each side job of each quality. Each minute districts can receive new random side jobs. Player can also manually increase counters by performing searches. Then, if district has side job available, player can assign one crew member to perform it. Cancelling side job will increase counter so it won't be lost and player doesn't need to perform search again.

Side jobs don't have time limit, always depend on one performer, have lowest requirements and will give rewards immediately, without time walling. On other hand, side jobs have weakest multipliers. They are useful mostly in the beginning of game.

Quality increases search time, requirements and gains.

### Contracts

Main way to gain resources. Each district has it's own set of counters for each contract type of each quality. Each minute districts can receive new random contracts. Player can also manually increase counters by performing searches. Then, if district has contract available, player can assign multiple crew members to perform it. Cancelling contract will increase counter so it won't be lost and player doesn't need to perform search again.

Unlike side jobs, contracts require some time, combat or hacking to be finished first and can be done one time only. Performance bonuses are summed from all team members for contract. Contracts are unlocked after reaching some credibility milestone.

Quality increases search time, requirements and gains. Contracts can reward player with items that have level same as city and quality same as contract.

### Missions

Missions affect map and global state. Each district has it's own set of available missions, depending on faction and facility. Missions first must be found by search. Only one crew member can perform search. After that, team perform the work. Missions work like contracts, but once mission objective is done, they cannot be retried. Missions may require up to 10 members and are unlocked in specific cities.

Quality increases search time and gains, decreases requirements. Cancelling mission will return it to the set of available missions, allowing player to retry it. Retailation missions are limited by quality of search, ie. search with quality Average can find retailations with quality Average or lower.

Non-retailation missions are limited by 1 for each mission type and district. Only one retailation mission available for each retailation.

Missions allow feats such as:
- Squeezing shops for money, equipment and blueprints. After robbing shop, it cease to deal with player. Can be done stealthely, by combat, by threatening or by hacking.
- Preventing retailations. Can be done in multiple ways, maybe depending on retailation type. Can be done in player district.
- Raiding enemy faction HQ for money, items, decreasing power level, relocation bonuses and blueprints. Can be done in multiple ways.
- Seizing control of allied faction HQ, allowing transferring their money directly to player account or spending additional funds for increased power level or credibility. Ditto.

### Augmentation

Augmentation will install augmentations in selected crew member. After installing augmentations, crew member will be in recovery for sum of every augmentation recovery time. During recovery, crew member is disabled and cannot be assigned to work. Augmentation won't be started unless it can be paid fully.

### Re-equipment

Re-equipment will change equipment for selected crew member. It will change their inventory instantly and will disable crew member for short time.

### Applying booster

Applying booster will apply booster for selected crew member. It will add them status effect instantly and will disable crew member for short time.

### Training

Training will increase skill or attribute by one depending on which facility is used for selected crew member. For each increase, price will increase exponentially. Training won't be started unless it can be paid fully. In addition, each increase require small amount of time. Depending on facility quality, limit for training can be increased.

## Combat

Specific orders require combat to finish. These orders have bosses with combat stats. Each second turn occurs, during which remaining team members and boss will exchange hits. Team members will attack first. Once boss HP is equal or lower than 0, combat is passed. After that, order will checked if it's requirements are still passable. If yes, then order is completed. Combat allows finishing orders faster at cost of potential crew loss.

To prevent combat from dragging, it also has time limit.

Combat is unlocked at some point. Combat contracts and missions can be cancelled.

## Server

Player can purchase or write server for running programs. Server has three parameters:

- Level increases perfomance of running programs
- RAM allows to store more and larger programs
- Cores allow to run more programs simultaneously

Server is unavailable initially, unlocking it requires finishing specific city.

## Programs

Programs allow to perform some actions automatically without crew member input. Each program must be written first by crew member, program level depends on crew member hacking level. Programs also have quality and higher quality leads to higher production time.

Programs are unavailable initially, unlocking them requires finishing specific city.

To prevent wasting resources, special program can be purchased/made to generate money depending on unused RAM/cores.

Examples of programs:
- Spoofing programs, for passive money generation
- Hacking programs, for performing hacking orders
- Side job/contract searching programs, for increasing passive side job/contract generation in particular district
- Mission searching programs, for generating missions in districts

## Hacking

Specific orders require hacking to finish. Hacking requires filling specific scale within time limit while hacking program is active. After that, order will continue as usual.

Hacking is unavailable initially, unlocking it requires finishing credibility milestone in specific city.

# Content

## Cities

Cities have upper limit on difficulty level unless noted.

### Starting city

Starting city has only one faction - **Neighbourwatch**. Player begins here after starting the game. Has small size and designed to learn how to use basic mechanics.

Has following unlocks:
- Training
- Contracts
- Weapon shops and combat
- Pharmacy
- Augmentations
- Relocation

### City of Dreams

City of Dreams has 4-6 random factions. Unlike most other cities, City of Dreams has repeatable rewards, allowing farming them by getting previous levels of credibility repeatedly. City of Dreams does not have upper difficulty level.

City of Dreams will reward player 1 skill and 1 attribute points for each level of completion.

### City of Dreams

City of Dreams has 4-6 random factions. Unlike most other cities, City of Dreams has repeatable rewards, allowing farming them by getting previous levels of credibility repeatedly. City of Dreams does not have upper difficulty level.

City of Dreams will reward player 1 skill and 1 attribute points for each level of completion.

### Science city

Science city has two factions: **Gamma security** and random. Training facilities of max quality are available here from the start. It has large number of training facilities.

Completing science city will unlock training facility usage and reward player with additional training facilities for each level of completion. Maximum 6 levels are available.

### Smuggler's city

Smuggler's city has two factions: **placeholder** and random. Crew members here can be hired with equipment of max quality and arms shops are available immediately with max quality.

Completing smuggler's city will reward player with ability to hire crew members with higher quality of equipment and increase starting quality of weapon shops. Maximum 6 levels are available.

### Cyborg city

Cyborg city has two factions: **placeholder** and random. Crew members here can be hired with augmentations of max quality and hospitals are available immediately with max quality.

Completing cyborg city will reward player with ability to hire crew members with higher quality of augmentations and increase starting quality of hospitals. Maximum 6 levels are available.

### Junkie's city

Junkie's city has two factions: **placeholder** and random. Pharmacies are available immediately with max quality. Player crew can use multiple boosters at same time.

Completin junkie's city will reward player with ability to use more side effects and increase stating quality of pharmacies.

### Combat zone

Combat zone has three-four factions - **Neighbourwatch**, **Anarks** and **placeholder**. Size is medium. Designed to be a tutorial for advanced mechanics.

Has following unlocks:
- Wanted level and crimes
- Turf war
- Missions and retailations

### Hacking city

Hacking city has multiple factions. Size is medium.

Has following unlocks:
- Server
- Hacking orders
- Script automation (maybe too hard)

## Districts

## Factions
