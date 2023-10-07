def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    # This works damnit!
    # return {char: phrase.count(char) for char in set(list(phrase))}
    
    # return new_dict
    return {char: phrase.count(char) for char in list(phrase)}
