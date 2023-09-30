def return_upper_word(string):
    '''Returns a word in all caps'''
    return string.upper()

def must_start_with(string, char):
    '''Returns whether the str starts with the given char'''
    return True if string[0] == char else False

def print_upper_words(words, starts_with):
    '''Takes a list of strings and a list of starting chars
    and prints the words that start with the provided chars
    in all caps'''
    for string in words:
        for char in starts_with:
            if must_start_with(string.lower(), char.lower()):
                print(return_upper_word(string))

word_list = ['aPple','bAnana','Pear']
char_list_1 = ['p']
char_list_2 = ['a','b']
char_list_3 = ['b','p']

print_upper_words(word_list, char_list_1)
print_upper_words(word_list, char_list_2)
print_upper_words(word_list, char_list_3)
