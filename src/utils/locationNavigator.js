import { useHistory, useLocation } from 'react-router-dom'; // version 5.2.0

export default class LocationNavigator {

    location = useLocation();
    history = useHistory();

    searchParams = new URLSearchParams(this.location.search);

    getUrlParam = (name) => this.searchParams.get(name);

    getFilterFromUrl = () => this.getUrlParam('filter') ?? '';

    getTagsFromUrl = () => this.getUrlParam('tags')?.split(';') ?? [];

    navigate = (url) => this.history.push(url); //history.replace(url)
}

export const useLocationNavigator = () => new LocationNavigator();