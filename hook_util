
import os
import sys
import pdb
import subprocess
import pexpect


def ob(a):
    cmd = f"frida-ps -U | grep '{a}'"
    a = os.popen(cmd, 'r', 1).read()
    s = a.split(' ')[0]
    b = f"objection -g {s} explore"
    # pdb.set_trace()
    sub = subprocess.run(b, shell=True)


def frida():
    b = "adb shell"
    s = pexpect.spawn(b)
    s.expect("bullhead:*")
    s.sendline("su\n")
    s.expect("bullhead:/ #")
    s.send("cd data/local/tmp\n")
    s.expect("bullhead:/data/local/tmp #")
    s.send("./k0123a\n")
    s.interact()


def dump():
    sub = subprocess.run("frida-dex-dump", shell=True)


if __name__ == '__main__':
    args = sys.argv
    if len(args) == 2:
        eval(args[1])()
    elif len(args) == 3:
        eval(args[1])(args[2])
