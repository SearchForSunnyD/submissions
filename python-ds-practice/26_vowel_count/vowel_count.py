def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!')
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowel = 'aeiou'
    r_dict = {}
    for char in list(phrase):
        if char.lower() in vowel:
            if char.lower() in r_dict:
                r_dict[char.lower()] += 1
            else:
                r_dict[char.lower()] = 1

    return r_dict
