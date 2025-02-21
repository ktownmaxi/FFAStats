class GeneralPlayerStats {
    #playerId;
    #playername;
    #playerhead;
    #xp;
    #kills;
    #deaths;
    #currentKillStreak;
    #highestKillStreak;
    #bounty;

    constructor(data) {
        this.#playerId = data.playerId;
        this.#playername = data.playername;
        this.#playerhead = data.playerhead;
        this.#xp = data.xp;
        this.#kills = data.kills;
        this.#deaths = data.deaths;
        this.#currentKillStreak = data.currentKillStreak;
        this.#highestKillStreak = data.highestKillStreak;
        this.#bounty = data.bounty;
    }

    // Getter-Methods
    get playerId() {
        return this.#playerId;
    }

    get playername() {
        return this.#playername;
    }

    get playerhead() {
        return this.#playerhead;
    }

    get xp() {
        return this.#xp;
    }

    get kills() {
        return this.#kills;
    }

    get deaths() {
        return this.#deaths;
    }

    get currentKillStreak() {
        return this.#currentKillStreak;
    }

    get highestKillStreak() {
        return this.#highestKillStreak;
    }

    get bounty() {
        return this.#bounty;
    }

    // Setter-Methods
    set playerId(value) {
        this.#playerId = value;
    }

    set playername(value) {
        this.#playername = value;
    }

    set playerhead(value) {
        this.#playerhead = value;
    }

    set xp(value) {
        this.#xp = value;
    }

    set kills(value) {
        this.#kills = value;
    }

    set deaths(value) {
        this.#deaths = value;
    }

    set currentKillStreak(value) {
        this.#currentKillStreak = value;
    }

    set highestKillStreak(value) {
        this.#highestKillStreak = value;
    }

    set bounty(value) {
        this.#bounty = value;
    }

    toString() {
        return `Player ID: ${this.#playerId}
            Player Name: ${this.#playername}
            Player Head: ${this.#playerhead}
            XP: ${this.#xp}
            Kills: ${this.#kills}
            Deaths: ${this.#deaths}
            Current Kill Streak: ${this.#currentKillStreak}
            Highest Kill Streak: ${this.#highestKillStreak}
            Bounty: ${this.#bounty}`;
    }

    toJSON() {
        return {
            playerId: this.#playerId,
            playername: this.#playername,
            playerhead: this.#playerhead,
            xp: this.#xp,
            kills: this.#kills,
            deaths: this.#deaths,
            currentKillStreak: this.#currentKillStreak,
            highestKillStreak: this.#highestKillStreak,
            bounty: this.#bounty
        };
    }
}

export default GeneralPlayerStats;