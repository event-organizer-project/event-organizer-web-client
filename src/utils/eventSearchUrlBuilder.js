export default class EventSearchUrlBuilder {

    tags = [];
    filter = '';

    setFilter = (searchText) => {
        this.filter = searchText;
        return this;
    }

    addTag = (tag) => {
        this.tags.push(tag);
        return this;
    }

    addTags = (tags) => {
        this.tags = this.tags.concat(tags);
        return this;
    }

    build = () => {
        let url = '/events';

        if (!this.filter && !this.tags.length)
            return url;

        url += '?'

        if (this.filter)
            url += `filter=${this.filter}`

        if (this.tags.length) {
            if (url.length != 8)
                url += '&'
            
            url += 'tags='
            url += this.tags.join(';')
        }

        return url;
    }

}