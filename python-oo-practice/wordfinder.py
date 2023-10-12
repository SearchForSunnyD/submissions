"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    def __init__(self, path):
        '''get a list and print the length'''
        self.words = self.get_list(path)
        print(f"I found {self.list_size()} terms!")

    def list_size(self):
        return format(len(self.words), ',')

    def get_list(self, path):
        '''initialize a list of words from the file listed in the path given'''
        words = []
        for line in open(f"{path}", "r"):
            words.append(self.line_clean(line))
        return words
    
    def line_clean(self, line):
        return line.strip().capitalize()

    def random(self, words = None):
        '''return a random word from the words list'''
        if words == None:
            words = self.words
        return words[random.randint(0, len(words) - 1)]
    
class SpecialWordFinder(WordFinder):
    def get_list(self, path):
        words = {}
        for line in open(f"{path}", "r"):
            if line.startswith('# '):
                sort = self.line_clean(line)
                words[sort] = []
            else:
                words[sort].append(self.line_clean(line))
        return words
    
    def list_size(self):
        num = 0
        for key in self.words:
            num += len(key)
        return format(num, ',')
    
    def line_clean(self, line):
        line = line.replace("# ", '')
        return super().line_clean()
    
    def show_keys(self):
        print(f"There are {len(self.words)} possible filter terms")
        print(f"Filter terms: {list(self.words.keys())}")
