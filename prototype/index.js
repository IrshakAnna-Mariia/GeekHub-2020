function Csv() {
    this.parse = (string, separator) =>{
        string = string.split('\n');
        if (separator===undefined){
            let comma = [...string];
            let semicolon = [...string];
            let tab = [...string];

            const commaLength = comma.reduce((pr, item, index) =>{
                if(!(item.indexOf(',')===-1))comma[index]=item.split(',');
                if(!(pr===undefined))if(!(pr===comma[index].length))return -1;
                if (pr===-1)return;
                return comma[index].length;
            }, undefined)
            const semicolonLength = semicolon.reduce((pr, item, index) =>{
                if(!(item.indexOf(';')===-1))semicolon[index]=item.split(';');
                if(!(pr===undefined))if(!(pr===semicolon[index].length))return -1;
                if (pr===-1)return;
                return semicolon[index].length;
            }, undefined)
            const tabLength = tab.reduce((pr, item, index) =>{
                if(!(item.indexOf(' ')===-1))tab[index]=item.split(' ');
                if(!(pr===undefined))if(!(pr===tab[index].length))return -1;
                if (pr===-1)return;
                return tab[index].length;
            }, undefined)

            if(!(commaLength===-1))string=[...comma];
            if(!(semicolonLength===-1))string=[...semicolon];
            if(!(tabLength===-1))string=[...tab];

            return string;
        }
        string.map((item, index)=>{string[index]=item.split(separator);});
        return string;
    }
    this.generate = (array, separator) =>{
        if (separator===undefined) return array.join(',');
        return array.join(separator);
    }
}
